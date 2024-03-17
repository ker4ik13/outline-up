import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IJwtPayload } from 'src/types/IJwtPayload';

export const CurrentUser = createParamDecorator(
  (
    key: keyof IJwtPayload,
    ctx: ExecutionContext,
  ): IJwtPayload | Partial<IJwtPayload> => {
    const request = ctx.switchToHttp().getRequest();
    return key ? request.user[key] : request.user;
  },
);
