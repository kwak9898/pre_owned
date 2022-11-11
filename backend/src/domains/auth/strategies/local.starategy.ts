import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  /**
   * 인증 전략 구현
   */
  async validate(email: string, password: string) {
    const member = await this.authService.validateMember(email, password);

    if (!member) {
      throw new UnauthorizedException();
    }
    return member;
  }
}
