import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { MembersRepository } from 'src/domains/members/members.repository';
import { Members } from 'src/entities/members.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(MembersRepository)
    private membersRepository: MembersRepository,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: any) {
    const { email } = payload;
    const member: Members = await this.membersRepository.findOne({
      where: { email },
    });

    if (!member) {
      throw new UnauthorizedException();
    }

    return member;
  }
}
