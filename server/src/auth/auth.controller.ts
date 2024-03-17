import { ACCESS_TOKEN, REFRESH_TOKEN } from '@common/constants';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { add } from 'date-fns';
import { Response } from 'express';
import { LoginUserDto } from 'src/crud/user/dto/login/login.user.dto';
import { RegisterUserDto } from 'src/crud/user/dto/register/register.user.dto';
import { UserResponse } from 'src/crud/user/dto/responses';
import { Tokens } from 'src/types/Tokens';
import { AuthService } from './auth.service';
import { Cookie, Public, UserAgent } from './decorators';

@Public()
@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  async login(
    @Body() userDto: LoginUserDto,
    @Res() res: Response,
    @UserAgent() agent: string,
  ) {
    const { tokens, user } = await this.authService.login(userDto, agent);

    if (!tokens) {
      throw new BadRequestException({
        message: ['Ошибка при входе'],
      });
    }
    this.setTokensInCookie(tokens, res, user);
  }

  @UsePipes(ValidationPipe)
  @Post('register')
  async register(@Body() userDto: RegisterUserDto) {
    const user = await this.authService.register(userDto);

    if (!user) {
      throw new BadRequestException({
        message: ['Ошибка при регистрации'],
      });
    }

    return new UserResponse(user);
  }

  @Get('logout')
  async logout(
    @Cookie(REFRESH_TOKEN) refresh_token: string,
    @Res() res: Response,
  ) {
    if (!refresh_token) {
      res.sendStatus(HttpStatus.OK);
      return;
    }

    // Удаление токенов
    await this.authService.deleteRefreshToken(refresh_token);
    res.cookie(REFRESH_TOKEN, '', {
      httpOnly: true,
      secure: true,
      expires: new Date(),
    });

    res.cookie(ACCESS_TOKEN, '', {
      httpOnly: true,
      secure: true,
      expires: new Date(),
    });

    res.sendStatus(HttpStatus.OK);
  }

  @Get('refresh')
  async refresh(
    @Cookie(REFRESH_TOKEN) refresh_token: string,
    @Res() res: Response,
    @UserAgent() agent: string,
  ) {
    if (!refresh_token) {
      throw new UnauthorizedException({
        message: ['Вы не авторизованы'],
      });
    }

    const tokens = await this.authService.refreshTokens(refresh_token, agent);

    if (!tokens) {
      throw new UnauthorizedException({
        message: ['Ошибка обновления токенов'],
      });
    }

    this.setTokensInCookie(tokens, res);
  }

  private setTokensInCookie(
    tokens: Tokens,
    res: Response,
    user?: UserResponse,
  ) {
    if (!tokens) {
      throw new UnauthorizedException({
        message: ['Вы не авторизованы'],
      });
    }

    res.cookie(REFRESH_TOKEN, tokens.refresh_token.token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(tokens.refresh_token.exp),
      secure:
        this.configService.get('NODE_ENV', 'development') === 'production',
      path: '/',
    });

    res.cookie(ACCESS_TOKEN, tokens.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: add(new Date(), {
        minutes: 10,
      }),
      secure:
        this.configService.get('NODE_ENV', 'development') === 'production',
      path: '/',
    });

    if (user) {
      res.json(user).status(HttpStatus.CREATED);
      return;
    }

    res.sendStatus(HttpStatus.CREATED);
  }
}
