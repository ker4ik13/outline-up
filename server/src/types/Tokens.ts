import { Token } from 'src/crud/token/token.schema';

export interface Tokens {
  access_token: string;
  refresh_token: Token;
}
