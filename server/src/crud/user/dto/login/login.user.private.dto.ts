import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class LoginUserPrivateDto {
  @ApiProperty({
    example: 'dasdusakdsada',
    description: 'Пароль',
  })
  @MinLength(8, {
    message: 'Пароль должен состоять не менее, чем из 8 символов',
  })
  password: string;
}
