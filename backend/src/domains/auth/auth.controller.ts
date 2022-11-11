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
    private readonly authService: AuthService,
    private readonly membersService: MembersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@CurrentMamber() memeber: Members): Promise<SignInResponseDto> {
    const memberId = memeber.memberId;
    const accessToken = this.authService.createAccessToken(memberId);
    const refreshToken = this.authService.createRefreshToken(memberId);

    await this.membersService.setCurrentRefreshToken(refreshToken, memberId);

    return { accessToken, refreshToken };
  }
}
