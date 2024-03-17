import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { UserRoles } from 'src/types/user/UserRoles';

export class AddRoleDto {
  @ApiProperty({
    example: UserRoles.Editor,
    description: 'Роль пользователя',
  })
  @MinLength(1, {
    message: 'Роль должна быть длинной минимум 1 символ',
  })
  @IsString({ message: `Роль должна быть строкой вида "${UserRoles.User}"` })
  readonly value: string;

  @ApiProperty({
    description: 'ID пользователя',
  })
  readonly userId: string;
}
