import { Repository } from "../../repositories";
import { Identified } from "../../types";
import { indexOf, remove } from 'lodash'

/**
 * A list service provides utility methods for handling lists of specific items, a thing we tend to do
 * a lot in the applciation, especially on the administration side. It allows the addition, update and
 * removal of items on a list, by calling the specific methods on the linked repository for this kind
 * of items.
 * @author Vincent Courtois <courtois.vincent@outlook.com>
 */
export class ListService<Wrapped extends Identified, CreationWrapper = Wrapped> {
  // The repository used to make simple CRUD operations on this kind of resources.
  private readonly repository: Repository<Wrapped, CreationWrapper>;
  // The list of items queried on the repository, supposed to reflect the state on the API.
  private items: Wrapped[] = [];
  // The auth token given at creation to identify when queries are made.
  private token: string;

  public constructor(repository: Repository<Wrapped, CreationWrapper>, token: string) {
    this.repository = repository;
    this.token = token;
  }

  public async fetch(): Promise<Wrapped[]> {
    const results: Promise<Wrapped[]> = this.repository.list(this.token);
    results.then((items: Wrapped[] = []) => {
      for (const item of items) this.append(item);
    });
    return results;
  }

  public get all(): Wrapped[] {
    return this.items;
  }

  public async create(item: CreationWrapper): Promise<Wrapped> {
    const promise: Promise<Wrapped> = this.repository.create(item, this.token);
    promise.then((item: Wrapped) => this.append(item));
    return promise;
  }

  public update(item: Wrapped): Promise<Wrapped> {
    return this.repository.update(item, this.token);
  }

  public delete(item: Wrapped) {
    this.repository.delete(item.id, this.token);
    remove(this.items, { id: item.id })
  }

  private append(item: Wrapped) {
    if (indexOf(this.items, { id: item.id }) < 0) {
      this.items.push(item);
    }
  }
}