import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Members } from 'src/entities/members.entity';
import { MEMBER_EXCEPTION } from 'src/exception/memberErrorCode';
import { createMemberDto } from './dto/createMember.dto';
import { MembersRepository } from './members.repository';

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
  findOneMember(email: string): Promise<Members> {
    if (!email) {
      throw new NotFoundException(MEMBER_EXCEPTION.MEMBER_CODE_NOT_FOUND);
    }

    return this.membersRepository.findOneByMember(email);
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
