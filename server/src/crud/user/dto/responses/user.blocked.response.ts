import { UserBlocked } from 'src/types/user';

export class UserBlockedResponse implements UserBlocked {
  isBlocked: boolean;
  blockReason: string;
  blockDate: string;

  constructor({ blockDate, blockReason, isBlocked }: UserBlocked) {
    this.isBlocked = isBlocked;
    this.blockReason = blockReason;
    this.blockDate = blockDate;
  }
}
