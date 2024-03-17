import { REFRESH_TOKEN } from '@common/constants';
import {
  Controller,
  Get,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from 'src/crud/user/dto/user.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthControllerDocs {
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserDto,
  })
  @Post('login')
  async login() {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserDto })
  @UsePipes(ValidationPipe)
  @Post('register')
  async register() {}

  @ApiOperation({ summary: 'Выход пользователя' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiCookieAuth(REFRESH_TOKEN)
  @Get('logout')
  async logout() {}

  @ApiOperation({ summary: 'Обновление токенов' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiCookieAuth(REFRESH_TOKEN)
  @Get('refresh')
  async refresh() {}
}
