import type { UserPhone } from "@/shared/types/user";

export class UserPhoneDto implements UserPhone {
  number: string | undefined;
  country: string | undefined;

  constructor({ country, number }: UserPhone) {
    this.number = number || undefined;
    this.country = country || undefined;
  }
}
