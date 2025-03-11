import { Identified } from "./utils/Identified";

export type Session = Identified & { token: string};