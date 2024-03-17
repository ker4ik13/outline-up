import type { IsValid } from 'src/types/IsValid';

export class IsValidDto implements IsValid {
  isValid: boolean;
  message: string;

  constructor({ isValid, message }: IsValid) {
    this.isValid = isValid;
    this.message = message;
  }
}
