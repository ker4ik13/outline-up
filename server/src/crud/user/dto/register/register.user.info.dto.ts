import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class RegisterUserInfoDto {
  @MinLength(2, {
    message: 'Имя должно состоять не менее, чем из 2 символов',
  })
  @IsString({
    message: 'Имя должно состоять из букв',
  })
  @ApiProperty({
    example: 'Иван',
    description: 'Имя пользователя',
  })
  readonly firstName: string;

  @IsString({
    message: 'Фамилия должна состоять из букв',
  })
  @MinLength(2, {
    message: 'Фамилия должна состоять не менее, чем из 2 символов',
  })
  @ApiProperty({
    example: 'Иванов',
    description: 'Фамилия пользователя',
  })
  readonly lastName: string;
}
