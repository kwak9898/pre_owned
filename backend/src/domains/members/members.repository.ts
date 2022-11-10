import { JwtService } from '@nestjs/jwt';
import { Members } from 'src/entities/members.entity';
import { DataSource, Repository } from 'typeorm';

export class MembersRepository extends Repository<Members> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {
    super(Members, dataSource.createEntityManager());
  }

  /**
   * 유저 생성
   */
  async createMember(createMemberDto): Promise<Members> {
    return;
  }
}
