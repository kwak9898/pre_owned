import {
  Body,
  Controller, Get,
  HttpCode, Param,
  Post,
  ValidationPipe
} from "@nestjs/common";
import { Members } from 'src/entities/members.entity';
import { createMemberDto } from './dto/createMember.dto';
import { MembersService } from './members.service';
import { Public } from '../../decorators/skipAuth.decorator';

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

  /**
   * 특정 멤버 조회
   */
  @Public()
  @Get(':email')
  findOneMember(@Param('email') email: string): Promise<Members> {
    return this.membersService.findOneMember(email);
  }
}
