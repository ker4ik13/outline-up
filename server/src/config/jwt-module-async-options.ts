import { ConfigService } from '@nestjs/config';
import { type JwtModuleAsyncOptions, type JwtModuleOptions } from '@nestjs/jwt';

const jwtModuleOptions = (config: ConfigService): JwtModuleOptions => ({
  secret: config.get('SECRET_KEY'),
  signOptions: {
    expiresIn: config.get('JWT_EXPIRES', '30m'),
  },
});

export const options = (): JwtModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => jwtModuleOptions(config),
});
