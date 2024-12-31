import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserLoggedIn = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    /**
     * custom data here
     */
    return request['user'];
  },
);
