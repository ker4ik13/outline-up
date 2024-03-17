import { Exclude } from 'class-transformer';
import type { UserPrivate } from 'src/types/user';

export class UserPrivateResponse implements UserPrivate {
  @Exclude()
  password: string;
  createdAt: string;

  passwordUpdatedAt?: string;
  telegramId?: number;

  constructor(userPrivate: UserPrivate) {
    this.passwordUpdatedAt = userPrivate.passwordUpdatedAt || undefined;
    this.telegramId = userPrivate.telegramId || undefined;
    this.createdAt = userPrivate.createdAt;
  }
}
