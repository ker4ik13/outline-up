import type { UserPrivate } from "@/shared/types/user";

export class UserPrivateDto implements UserPrivate {
  password: string;
  createdAt: string;
  passwordUpdatedAt?: string;
  telegramId?: number;

  constructor(userPrivate: UserPrivate) {
    this.password = userPrivate.password;
    this.passwordUpdatedAt = userPrivate.passwordUpdatedAt;
    this.telegramId = userPrivate.telegramId;
    this.createdAt = userPrivate.createdAt;
  }
}
