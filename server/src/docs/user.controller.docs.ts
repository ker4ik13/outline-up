import { RolesGuard } from '@auth/guards';
import { Roles } from '@common/decorators';
import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/crud/user/dto/user.dto';
import { UserRoles } from 'src/types/user/UserRoles';

@ApiTags('Пользователи')
@Controller()
export class UserControllerDocs {
  // Получение всех пользователей
  @ApiOperation({
    summary: `Получить всех пользователей. Доступен с ролями: ${UserRoles.Creator}, ${UserRoles.Admin}`,
  })
  @ApiResponse({ status: HttpStatus.OK, type: [UserDto] })
  @UseGuards(RolesGuard)
  @Roles(UserRoles.Creator, UserRoles.Admin)
  @Get('users')
  async getAllUsers() {}

  // Получение пользователя по ID
  @ApiOperation({
    summary: `Получить пользователя по ID. Доступен с ролями: ${UserRoles.Creator}, ${UserRoles.Admin}`,
  })
  @ApiParam({
    name: 'id',
    example: 'k34jjnsdfusa8i#3ddr3',
    required: true,
    type: String,
  })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  @UseGuards(RolesGuard)
  @Roles(UserRoles.Creator, UserRoles.Admin)
  @Get('users/:id')
  getUserById() {}

  // Удаление пользователя по ID
  @ApiOperation({ summary: `Удалить пользователя по ID.` })
  @ApiParam({
    name: 'id',
    example: 'k34jjnsdfusa8i#3ddr3',
    required: true,
    type: String,
  })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  @UseGuards(RolesGuard)
  @Delete('users/:id')
  deleteUserById() {}

  // Изменение пользователя по ID
  @ApiOperation({
    summary: `Изменить пользователя по ID. Доступен для своего аккаунта и с ролями: ${UserRoles.Creator}, ${UserRoles.Admin}`,
  })
  @ApiParam({
    name: 'id',
    example: 'k34jjnsdfusa8i#3ddr3',
    required: true,
    type: String,
  })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  @Patch('users/:id')
  updateUserById() {}

  // Выдать роль пользователю
  @ApiOperation({
    summary: `Выдать роль пользователю. Доступен с ролями: ${UserRoles.Creator}`,
  })
  @ApiParam({
    name: 'role',
    example: {
      value: UserRoles.Editor,
      userId: 'dsjhdusacnsacihjaus',
    },
    required: true,
    type: Object,
  })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  @UseGuards(RolesGuard)
  @Roles(UserRoles.Creator)
  @Post('users/role')
  addRole() {}

  // Забанить пользователя
  @ApiOperation({
    summary: `Забанить пользователя. Доступен с ролями: ${UserRoles.Creator}, ${UserRoles.Admin}`,
  })
  @ApiParam({
    name: 'id',
    example: 'k34jjnsdfusa8i#3ddr3',
    required: true,
    type: String,
  })
  @ApiResponse({ status: HttpStatus.OK })
  @UseGuards(RolesGuard)
  @Roles(UserRoles.Creator, UserRoles.Admin)
  @Post('users/ban')
  ban() {}

  // Разбанить пользователя
  @ApiOperation({
    summary: `Разбанить пользователя. Доступен с ролями: ${UserRoles.Creator}, ${UserRoles.Admin}`,
  })
  @ApiParam({
    name: 'id',
    example: 'k34jjnsdfusa8i#3ddr3',
    required: true,
    type: String,
  })
  @ApiResponse({ status: HttpStatus.OK })
  @UseGuards(RolesGuard)
  @Roles(UserRoles.Creator, UserRoles.Admin)
  @Post('users/unban/:id')
  unban() {}

  // Получить себя
  @ApiOperation({
    summary: 'Получить себя',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @Get('me')
  getMe() {}
}
