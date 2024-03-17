import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { RegisterUserInfoDto } from './register.user.info.dto';
import { RegisterUserPrivateDto } from './register.user.private.dto';

export class RegisterUserDto {
  @ApiProperty({
    example: 'myemail@gmail.com',
    description: 'Почта пользователя',
  })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  info: RegisterUserInfoDto;
  private: RegisterUserPrivateDto;
}
