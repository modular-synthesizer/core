import { Repository } from "../../repositories";
import { Identified } from "../../types";
import { find, findIndex, remove } from 'lodash'

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
    const index: number = findIndex(this.items, i => i.id === item.id);
    if (index >= 0) {
      const newItem: Wrapped = { ...this.items[index], ...item };
      this.items[index] = newItem;
      return this.repository.update(newItem, this.token);
    }
  }

  public delete(item: Wrapped|string) {
    const id: string = typeof item === 'string' ? item : item.id;
    this.repository.delete(id, this.token);
    remove(this.items, (iteratee: Wrapped) => id === iteratee.id)
  }

  private append(item: Wrapped) {
    if (!find(this.items, { id: item.id })) this.items.push(item);
  }
}