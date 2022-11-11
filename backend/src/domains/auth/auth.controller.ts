import { Controller, Post, UseGuards } from '@nestjs/common';
import { async } from 'rxjs';
import { CurrentMamber } from 'src/decorators/currentMember.decorator';
import { Public } from 'src/decorators/skipAuth.decorator';
import { Members } from 'src/entities/members.entity';
import { LocalAuthGuard } from '../guard/localAuth.guard';
import { MembersService } from '../members/members.service';
import { AuthService } from './auth.service';
import { SignInResponseDto } from './dto/signInResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private membersService: MembersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@CurrentMamber() member: Members): Promise<SignInResponseDto> {
    const email = member.email;
    const accessToken = this.authService.createAccessToken(email);
    const refreshToken = this.authService.createRefreshToken(email);

    await this.membersService.setCurrentRefreshToken(refreshToken, email);

    return { accessToken, refreshToken };
  }
}
