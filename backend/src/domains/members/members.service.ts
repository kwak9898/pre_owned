import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Members } from 'src/entities/members.entity';
import { MEMBER_EXCEPTION } from 'src/exception/memberErrorCode';
import { createMemberDto } from './dto/createMember.dto';
import { MembersRepository } from './members.repository';
import { UpdateMemberDto } from './dto/updateMember.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(MembersRepository)
    private membersRepository: MembersRepository,
  ) {}

  /**
   * 멤버 생성
   */
  createMember(createMemberDto: createMemberDto): Promise<Members> {
    return this.membersRepository.createMember(createMemberDto);
  }

  /**
   * 특정 멤버 조회
   */
  findOneByMember(email: string): Promise<Members> {
    if (!email) {
      throw new NotFoundException(MEMBER_EXCEPTION.MEMBER_CODE_NOT_FOUND);
    }

    return this.membersRepository.findOneByMember(email);
  }

  /**
   * 특정 멤버 정보 수정
   */
  async updateMember(updateMemberDto: UpdateMemberDto): Promise<Members> {
    const { email, password, memberName } = updateMemberDto;
    const member = await this.findOneByMember(email);

    if (password) {
      member.password = await bcrypt.hash(password, 12);
    }

    if (memberName) {
      member.memberName = memberName;
    }

    return await this.membersRepository.save(member);
  }

  /**
   * Refresh Token 저장
   */
  async setCurrentRefreshToken(refreshToken: string, email: string) {
    return await this.membersRepository.setCurrentRefreshToken(
      refreshToken,
      email,
    );
  }

  /**
   * refresh Token 검사
   */
  async getUserIfRefreshTokenMatches(refreshToken: string, email: string) {
    return this.membersRepository.getUserIfRefreshTokenMatches(
      refreshToken,
      email,
    );
  }
}
