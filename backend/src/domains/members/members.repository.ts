import { BadRequestException, Injectable } from '@nestjs/common';
import { Members } from 'src/entities/members.entity';
import { MEMBER_EXCEPTION } from 'src/exception/memberErrorCode';
import { DataSource, Repository } from 'typeorm';
import { createMemberDto } from './dto/createMember.dto';

@Injectable()
export class MembersRepository extends Repository<Members> {
  constructor(private readonly dataSource: DataSource) {
    super(Members, dataSource.createEntityManager());
  }

  /**
   * 유저 생성
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

    await member.hashPassword(password);
    const saveMember = await this.save(member);
    return saveMember;
  }
}
