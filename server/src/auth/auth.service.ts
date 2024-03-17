import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import { Token } from 'src/crud/token/token.schema';
import { TokenService } from 'src/crud/token/token.service';
import { LoginUserDto } from 'src/crud/user/dto/login/login.user.dto';
import { RegisterUserDto } from 'src/crud/user/dto/register/register.user.dto';
import { UserResponse } from 'src/crud/user/dto/responses';
import { UserDocument } from 'src/crud/user/user.schema';
import { UserService } from 'src/crud/user/user.service';
import { Tokens } from 'src/types/Tokens';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  // Вход
  async login(userDto: LoginUserDto, agent: string) {
    const user = await this.validateUser(userDto);

    if (!user) {
      throw new UnauthorizedException({
        message: ['Неверный логин или пароль'],
      });
    }

    return {
      tokens: await this.generateTokens(user, agent),
      user: new UserResponse(user),
    };
  }

  // Регистрация
  async register(userDto: RegisterUserDto): Promise<UserDocument> {
    // Проверка, есть ли пользователь с таким email в Базе Данных
    const candidate = await this.userService
      .getUserByEmail(userDto.email)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    if (candidate) {
      throw new ConflictException({
        errors: [
          {
            field: 'email',
            message: 'Пользователь с таким email уже существует',
          },
        ],
      });
    }

    return await this.userService
      .registerUser({
        ...userDto,
      })
      .catch((err) => {
        this.logger.error(err);
        return null;
      });
  }

  // Создание токенов
  private async generateTokens(
    user: UserDocument | UserResponse,
    agent: string,
  ) {
    const payload = {
      email: user.email,
      _id: user._id,
      roles: user.roles,
    };

    const access_token = this.jwtService.sign(payload);
    const refresh_token = await this.getRefreshToken(user._id, agent);

    return { access_token, refresh_token };
  }

  // Проверка пользователя
  private async validateUser(userDto: RegisterUserDto | LoginUserDto) {
    try {
      // Проверка на правильный пароль
      const user = await this.userService.getUserByEmail(userDto.email);

      const passwordEquals = await bcrypt.compare(
        userDto.private.password,
        user.private.password,
      );

      if (user && passwordEquals) {
        return user;
      }
    } catch (error) {
      throw new UnauthorizedException({
        message: ['Некорректный email или пароль'],
      });
    }
  }

  // Создание refresh токена
  private async getRefreshToken(
    userId: string | Types.ObjectId,
    agent: string,
  ): Promise<Token> {
    return this.tokenService.getRefreshToken(userId, agent);
  }

  // Обновление токенов
  async refreshTokens(refresh_token: string, agent: string): Promise<Tokens> {
    const token = await this.tokenService.findToken(refresh_token);

    if (!token) {
      throw new UnauthorizedException({
        message: ['Вы не авторизованы'],
      });
    }

    await this.tokenService.deleteToken(refresh_token);

    // Если истекла дата токена
    if (new Date(token.exp) < new Date()) {
      await this.tokenService.deleteToken(refresh_token);
      throw new UnauthorizedException({
        message: ['Дата токена истекла'],
      });
    }

    const user = await this.userService.getUserByIdOrSlug(token.userId);

    return this.generateTokens(user, agent);
  }

  // Удаление токена / выход пользователя
  async deleteRefreshToken(token: string) {
    return await this.tokenService.deleteToken(token);
  }
}
