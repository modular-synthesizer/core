/**
 * Describes an object identified in our system by a unique ID. Any of our resources MUST be
 * identified in such a way to ease tracability and avoid not finding records when investigating.
 * @author Vincent Courtois<courtois.vincent@outlook.com>
 */
export type Identified = {
  id: string,
};