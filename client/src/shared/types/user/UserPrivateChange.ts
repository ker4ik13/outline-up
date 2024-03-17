export interface UserPrivateChange {
  password: string;
  repeatPassword: string;
  passwordUpdatedAt?: string;
  telegramId?: number;
  createdAt: string;
}
