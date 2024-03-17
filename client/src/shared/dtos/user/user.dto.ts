import type {
  User,
  UserBlocked,
  UserInfo,
  UserNotifications,
  UserPrivate,
} from "@/shared/types/user";
import { UserBlockedDto } from "./user.blocked.dto";
import { UserInfoDto } from "./user.info.dto";
import { UserNotificationsDto } from "./user.notifications.dto";
import { UserPrivateDto } from "./user.private.dto";

export class UserDto implements User {
  _id: string;
  email: string;
  roles: string[];
  updatedAt?: string;
  info: UserInfo;
  private: UserPrivate;
  blocked?: UserBlocked;
  notifications?: UserNotifications;

  constructor(user: User) {
    this._id = user._id;
    this.email = user.email;
    this.updatedAt = user.updatedAt;
    this.roles = user.roles;

    this.private = new UserPrivateDto(user.private);
    this.info = new UserInfoDto(user.info);

    if (user.blocked) {
      this.blocked = new UserBlockedDto(user.blocked);
    }

    if (user.notifications) {
      this.notifications = new UserNotificationsDto(user.notifications);
    }
  }
}
