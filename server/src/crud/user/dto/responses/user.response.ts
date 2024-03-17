import { Types } from 'mongoose';
import { User, UserDocument } from 'src/crud/user/user.schema';
import type {
  UserBlocked,
  UserInfo,
  UserNotifications,
  UserPrivate,
} from 'src/types/user';
import { UserBlockedResponse } from './user.blocked.response';
import { UserInfoResponse } from './user.info.response';
import { UserNotificationsResponse } from './user.notifications.response';
import { UserPrivateResponse } from './user.private.response';

export class UserResponse implements User {
  _id: Types.ObjectId;
  email: string;
  roles: string[];
  updatedAt?: string;
  info: UserInfo;
  private: UserPrivate;
  blocked?: UserBlocked;
  notifications?: UserNotifications;

  constructor(user: UserDocument) {
    this._id = user._id;
    this.email = user.email;
    this.updatedAt = user.updatedAt;
    this.roles = user.roles;

    this.private = new UserPrivateResponse(user.private);
    this.info = new UserInfoResponse(user.info);

    if (user.blocked) {
      this.blocked = new UserBlockedResponse(user.blocked);
    }

    if (user.notifications) {
      this.notifications = new UserNotificationsResponse(user.notifications);
    }
  }
}
