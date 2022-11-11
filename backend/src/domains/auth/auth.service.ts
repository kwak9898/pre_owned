import { expression } from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MembersService } from '../members/members.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly membersService: MembersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Access Token 발급
   */
  createAccessToken(memberId: number) {
    const payload = { memberId };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}`,
    });
  }

  /**
   * Refresh Token 발급
   */
  createRefreshToken(memberId: number) {
    const payload = { memberId };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}`,
    });
  }

  /**
   * 비밀번호 유효성 검사
   */
  async validateMember(email: string, password: string) {
    const member = await this.membersService.findOneMember(email);
    if (member && member.password == password) {
      const { password, ...result } = member;
      return result;
    }
    return null;
  }
}
