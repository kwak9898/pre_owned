import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Members } from 'src/entities/members.entity';
import { createMemberDto } from './dto/createMember.dto';
import { MembersService } from './members.service';
import { Public } from '../../decorators/skipAuth.decorator';
import { UpdateMemberDto } from './dto/updateMember.dto';
import { UpdateMemberResponseDto } from './dto/updateMemberResponse.dto';

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
   * 특정 멤버 정보 수정
   */
  @Patch('/:memberId')
  async updateMember(
    @Param('memberId') memberId: number,
    @Body() updateMemberDto: UpdateMemberDto,
  ): Promise<UpdateMemberResponseDto> {
    const member = await this.membersService.updateMember(
      memberId,
      updateMemberDto,
    );

    return { email: member.email, memberName: member.memberName };
  }

  /**
   * 특정 멤버 삭제
   */
  @Delete('/:memberId')
  deleteByMember(@Param('memberId') memberId: number): Promise<void> {
    return this.membersService.deleteByMember(memberId);
  }
}
