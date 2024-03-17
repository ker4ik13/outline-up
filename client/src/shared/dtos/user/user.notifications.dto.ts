import type { UserNotifications } from "@/shared/types/user";

export class UserNotificationsDto implements UserNotifications {
  email?: boolean;
  telegram?: boolean;

  constructor(userNotifications: UserNotifications) {
    this.email = userNotifications.email || undefined;
    this.telegram = userNotifications.telegram || undefined;
  }
}
