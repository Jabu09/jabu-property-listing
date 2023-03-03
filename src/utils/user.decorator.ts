import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import jwt_decode from 'jwt-decode';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const decoded = jwt_decode(request.headers.authorization.split(' ')[1]);
  return decoded;
});
