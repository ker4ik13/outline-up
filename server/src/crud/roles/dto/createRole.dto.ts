import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateRoleDto {
  @MinLength(1, {
    message: 'Роль должна быть длинной минимум 1 символ',
  })
  @IsString({ message: 'Роль должна быть строкой вида "Администратор"' })
  @ApiProperty({
    example: 'Администратор',
    description: 'Роль пользователя',
  })
  readonly value: string;
}
