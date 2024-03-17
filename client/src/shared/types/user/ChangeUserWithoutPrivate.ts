import type { User } from "./User";

export interface ChangeUserWithoutPrivate extends Omit<User, "private"> {}
