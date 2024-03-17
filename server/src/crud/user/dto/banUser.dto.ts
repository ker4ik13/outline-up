import { IsString, MinLength } from 'class-validator';

export class BanUserDto {
  readonly userId: string;
  @MinLength(1, {
    message: 'Сообщение должно быть длинной минимум 1 символ',
  })
  @IsString({ message: 'Сообщение должно быть строкой' })
  readonly blockReason: string;
}
