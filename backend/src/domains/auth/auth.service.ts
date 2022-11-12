import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MembersService } from '../members/members.service';
import * as bcrypt from 'bcrypt';
import { AUTH_EXCEPTION } from '../../exception/authErrorCode';

@Injectable()
export class AuthService {
  constructor(
    private membersService: MembersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Access Token 발급
   */
  createAccessToken(email: string) {
    const payload = { email };
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
  createRefreshToken(email: string) {
    const payload = { email };
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
  async validateMember(email: string, plainTextPassword: string) {
    const member = await this.membersService.findOneMember(email);
    await this.verifyPassword(plainTextPassword, member.password);
    const { password, ...result } = member;
    return result;
  }

  /**
   * 비밀번호 일치 검사
   */
  private async verifyPassword(password: string, hashPassword: string) {
    const isPasswordMatch = await bcrypt.compare(password, hashPassword);
    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
      throw new BadRequestException(AUTH_EXCEPTION.AUTH_CODE_FAIL_VALIDATE);
    }
  }
}
