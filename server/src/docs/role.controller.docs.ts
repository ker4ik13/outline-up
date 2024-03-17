import { RolesGuard } from '@auth/guards';
import { Roles } from '@common/decorators';
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/crud/roles/role.schema';
import { UserRoles } from 'src/types/user/UserRoles';

@ApiTags('Роли пользователей')
@Controller()
export class RoleControllerDocs {
  @ApiOperation({ summary: 'Получить все роли' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get('roles')
  get() {}

  @ApiOperation({
    summary: `Добавление новой роли. Доступно с ролями: ${UserRoles.Creator}, ${UserRoles.Admin}`,
  })
  @ApiResponse({ status: 201, type: Role })
  @Roles(UserRoles.Creator, UserRoles.Admin)
  @UseGuards(RolesGuard)
  @Post('roles')
  create() {}

  @ApiOperation({ summary: 'Получение роли' })
  @ApiParam({
    name: 'value',
    example: 'ADMIN',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200, type: Role })
  @Get('roles/:value')
  getByValue() {}
}
