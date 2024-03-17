import { JwtAuthGuard, RolesGuard } from '@auth/guards';
import { Roles } from '@common/decorators';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRoles } from 'src/types/user/UserRoles';
import { CreateRoleDto } from './dto/createRole.dto';
import { RoleService } from './role.service';

@ApiTags('Роли пользователей')
@UseGuards(JwtAuthGuard)
@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('roles')
  get() {
    return this.roleService.getRoles();
  }

  @Roles(UserRoles.Creator, UserRoles.Admin)
  @UseGuards(RolesGuard)
  @Post('roles')
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Get('roles/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
