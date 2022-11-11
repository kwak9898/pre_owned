import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Members } from 'src/entities/members.entity';
import { createMemberDto } from './dto/createMember.dto';
import { MembersService } from './members.service';
import { Public } from "../../decorators/skipAuth.decorator";

@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  /**
   * 멤버 생성
   */
  @Public()
  @Post('/signup')
  @HttpCode(200)
  createMember(
    @Body(ValidationPipe) createMemberDto: createMemberDto,
  ): Promise<Members> {
    return this.membersService.createMember(createMemberDto);
  }
}
