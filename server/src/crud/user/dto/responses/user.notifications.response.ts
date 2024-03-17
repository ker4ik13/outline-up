import { UserNotifications } from 'src/types/user';

export class UserNotificationsResponse implements UserNotifications {
  email?: boolean;
  telegram?: boolean;

  constructor(userNotifications: UserNotifications) {
    this.email = userNotifications.email || undefined;
    this.telegram = userNotifications.telegram || undefined;
  }
}
