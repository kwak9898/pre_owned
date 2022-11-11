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
   * 멤버 생성
   */
  createMember(createMemberDto: createMemberDto): Promise<Members> {
    return this.membersRepository.createMember(createMemberDto);
  }
}
