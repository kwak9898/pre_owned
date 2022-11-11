import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Members } from 'src/entities/members.entity';
import { createMemberDto } from './dto/createMember.dto';
import { MembersRepository } from './members.repository';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(MembersRepository)
    private readonly membersRepository: MembersRepository,
  ) {}

  /**
   * 유저 생성
   */
  async createMember(createMemberDto: createMemberDto): Promise<Members> {
    return await this.membersRepository.createMember(createMemberDto);
  }
}
