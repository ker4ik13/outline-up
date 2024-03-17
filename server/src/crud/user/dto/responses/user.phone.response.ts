import { UserPhone } from 'src/types/user';

export class UserPhoneResponse implements UserPhone {
  number: string;
  country: string;

  constructor({ country, number }: UserPhone) {
    this.number = number || undefined;
    this.country = country || undefined;
  }
}
