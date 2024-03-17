import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import type { LoginUserPrivateDto } from './login.user.private.dto';

export class LoginUserDto {
  @ApiProperty({
    example: 'youremail@gmail.com',
    description: 'Электронная почта / логин',
  })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  private: LoginUserPrivateDto;
}
