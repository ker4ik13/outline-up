import {
  ChangeUserWithoutPrivate,
  UserBlocked,
  UserInfo,
  UserNotifications,
} from "@/shared/types/user";

export class ChangeUserDto implements ChangeUserWithoutPrivate {
  _id: string;
  email: string;
  roles: string[];
  updatedAt?: string | undefined;
  info: UserInfo;
  blocked?: UserBlocked | undefined;
  notifications?: UserNotifications | undefined;

  constructor(user: ChangeUserWithoutPrivate) {
    this._id = user._id;
    this.email = user.email;
    this.roles = user.roles;
    this.updatedAt = user.updatedAt;
    this.info = user.info;
    this.blocked = user.blocked;
    this.notifications = user.notifications;
  }
}
