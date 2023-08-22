import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthenticationRequest } from './types';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = <AuthenticationRequest>ctx.switchToHttp().getRequest();
    return request.user;
  },
);
