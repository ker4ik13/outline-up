export class CreateTokenDto {
  token: string;
  exp: Date;
  userId: string;
  userAgent: string;
}
