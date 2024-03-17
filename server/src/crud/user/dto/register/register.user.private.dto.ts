import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class RegisterUserPrivateDto {
  @ApiProperty({
    example: 'dksackxsadksnajsad',
    description: 'Пароль пользователя',
  })
  @MinLength(8, {
    message: 'Длина пароля должна состоять не менее, чем из 8 символов',
  })
  password: string;
  readonly createdAt: string = new Date().toISOString();
}
