import { CurrentUser } from '@auth/decorators';
import { JwtAuthGuard, RolesGuard } from '@auth/guards';
import { Roles } from '@common/decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config';
import { UserDto } from 'src/crud/user/dto/user.dto';
import { PageOptionsDto } from 'src/dtos/page';
import type { IJwtPayload } from 'src/types/IJwtPayload';
import { UserRoles } from 'src/types/user/UserRoles';
import type { AddRoleDto } from './dto/addRole.dto';
import type { BanUserDto } from './dto/banUser.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Получение всех пользователей
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Roles(UserRoles.Creator, UserRoles.Admin)
  @Get('users')
  async getAllUsers(@Query() pageOptions: PageOptionsDto) {
    return await this.userService.getAllUsers(new PageOptionsDto(pageOptions));
  }

  // Получение пользователя по ID
  @UseGuards(RolesGuard)
  @Roles(UserRoles.Creator, UserRoles.Admin, UserRoles.Editor)
  @Get('users/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserByIdOrSlug(id);
  }

  // Удаление пользователя по ID
  @UseGuards(RolesGuard)
  @Roles(UserRoles.Creator)
  @Delete('users/:id')
  deleteUserById(@Param('id') id: string, @CurrentUser() user: IJwtPayload) {
    return this.userService.deleteUserById(id, user);
  }

  // Изменение пользователя по ID
  @Patch('users/:id')
  updateUserById(
    @Param('id') id: string,
    @Body() userDto: UserDto,
    @CurrentUser() user: IJwtPayload,
  ) {
    return this.userService.updateUserById(id, userDto, user);
  }

  // Изменение фотографии пользователя по ID
  @Patch('users-photo/:id')
  @UseInterceptors(FileInterceptor('photo', multerOptions))
  updateUserPhotoById(
    @Param('id') id: string,
    @CurrentUser() user: IJwtPayload,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return this.userService.updateUserPhotoById(id, user, photo);
  }

  // Выдать роль пользователю
  @UseGuards(RolesGuard)
  @Roles(UserRoles.Creator)
  @Post('users/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  // Забанить пользователя
  @UseGuards(RolesGuard)
  @Roles(UserRoles.Creator, UserRoles.Admin)
  @Post('users/ban')
  ban(@Body() dto: BanUserDto, @CurrentUser() user: IJwtPayload) {
    return this.userService.ban(dto, user);
  }

  // Разбанить пользователя
  @UseGuards(RolesGuard)
  @Roles(UserRoles.Creator, UserRoles.Admin)
  @Post('users/unban/:id')
  unban(@Param('id') id: string) {
    return this.userService.unban(id);
  }

  // Проверить имя пользователя
  @Get('users/check-username/:slug')
  checkSlug(@Param('slug') slug: string) {
    return this.userService.checkSlug(slug);
  }
  // Проверить почту
  @Get('users/check-email/:email')
  checkEmail(@Param('email') email: string) {
    return this.userService.checkEmail(email);
  }

  // Получить себя
  @Get('me')
  getMe(@CurrentUser('_id') userId: string) {
    return this.userService.getUserByIdOrSlug(userId);
  }
}
