import { ACCESS_TOKEN } from '@common/constants';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserResponse } from 'src/crud/user/dto/responses';
import { UserService } from 'src/crud/user/user.service';
import { isUserBlocked } from 'src/libs/helpers';
import { IJwtPayload } from 'src/types/IJwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET_KEY'),
    });
  }

  private static extractJWT(req: Request): string | null {
    if (
      req.cookies &&
      ACCESS_TOKEN in req.cookies &&
      req.cookies.access_token.length > 0
    ) {
      return req.cookies.access_token;
    }
    return null;
  }

  async validate(payload: IJwtPayload) {
    const user: UserResponse = await this.userService
      .getUserByIdOrSlug(payload._id)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    if (isUserBlocked(user)) {
      throw new UnauthorizedException({
        message: ['Вы не авторизованы'],
      });
    }

    return payload;
  }
}
