import { BadRequestException, Injectable } from '@nestjs/common';
import { Members } from 'src/entities/members.entity';
import { AUTH_EXCEPTION } from 'src/exception/authErrorCode';
import { MEMBER_EXCEPTION } from 'src/exception/memberErrorCode';
import { DataSource, Repository } from 'typeorm';
import { createMemberDto } from './dto/createMember.dto';

@Injectable()
export class MembersRepository extends Repository<Members> {
  constructor(private dataSource: DataSource) {
    super(Members, dataSource.createEntityManager());
  }

  /**
   * 멤버 생성
   */
  async createMember(createMemberDto: createMemberDto): Promise<Members> {
    const { email, memberName, password, confirmPassword } = createMemberDto;
    const member = this.create({
      email,
      memberName,
      password,
    });

    const existMember = await this.findOne({ where: { email } });

    if (existMember) {
      throw new BadRequestException(MEMBER_EXCEPTION.MEMBER_CODE_EXIST);
    }

    if (password != confirmPassword) {
      throw new BadRequestException(
        MEMBER_EXCEPTION.MEMBER_CODE_PASSWORD_NOT_SAME,
      );
    }

    if (existMember.memberName) {
      throw new BadRequestException(MEMBER_EXCEPTION.MEMBER_CODE_EXIST);
    }

    await member.hashPassword(password);
    const saveMember = await this.save(member);
    return saveMember;
  }

  /**
   * 특정 멤버 조회
   */
  async findOneByMember(email: string): Promise<Members> {
    const member = await this.findOne({ where: { email } });
    return member;
  }

  /**
   * Refresh Token 저장
   */
  async setCurrentRefreshToken(refreshToken: string, email: string) {
    await this.update(email, { jwtToken: refreshToken });
  }

  /**
   * refresh Token 검사
   */
  async getUserIfRefreshTokenMatches(refreshToken: string, email: string) {
    const memeber = await this.findOneByMember(email);

    if (refreshToken == memeber.jwtToken) {
      return memeber;
    } else {
      throw new BadRequestException(AUTH_EXCEPTION.AUTH_CODE_NOT_EXIST_TOKEN);
    }
  }
}
