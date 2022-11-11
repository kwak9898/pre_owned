import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentMamber = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.member;
  },
);
