import type { UserBlocked } from "@/shared/types/user";

export class UserBlockedDto implements UserBlocked {
  isBlocked: boolean;
  blockReason: string;
  blockDate: string;

  constructor({ blockDate, blockReason, isBlocked }: UserBlocked) {
    this.isBlocked = isBlocked;
    this.blockReason = blockReason;
    this.blockDate = blockDate;
  }
}
