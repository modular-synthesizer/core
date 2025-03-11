import { Identified } from "./utils/Identified"

export type MembershipType = 'read'|'write'|'creator';

export type Membership = Identified & {
  account_id: string,
  username: string,
  type: MembershipType,
};