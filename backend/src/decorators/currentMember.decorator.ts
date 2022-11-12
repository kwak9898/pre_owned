import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Members } from '../entities/members.entity';

export const CurrentMember = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Members => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
