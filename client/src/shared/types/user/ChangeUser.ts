import type { UserBlocked } from "./UserBlocked";
import type { UserInfo } from "./UserInfo";
import type { UserNotifications } from "./UserNotifications";
import type { UserPrivateChange } from "./UserPrivateChange";

export interface ChangeUser {
  _id: string;
  email: string;
  updatedAt?: string;
  roles?: string[];
  info?: UserInfo;
  private?: UserPrivateChange;
  blocked?: UserBlocked;
  notifications?: UserNotifications;
}
