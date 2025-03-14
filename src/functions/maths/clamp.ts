import { maximum } from "./maximum";
import { minimum } from "./minimum";

export function clamp(value: number, min: number, max: number): number {
  return minimum(max, maximum(value, min));
}