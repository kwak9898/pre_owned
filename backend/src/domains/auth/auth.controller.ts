import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentMember } from 'src/decorators/currentMember.decorator';
import { Public } from 'src/decorators/skipAuth.decorator';
import { Members } from 'src/entities/members.entity';
import { LocalAuthGuard } from '../guard/localAuth.guard';
import { MembersService } from '../members/members.service';
import { AuthService } from './auth.service';
import { SignInResponseDto } from './dto/signInResponse.dto';
import { ProfileResponseDto } from './dto/profileResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private membersService: MembersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  @HttpCode(200)
  async signIn(@CurrentMember() member: Members): Promise<SignInResponseDto> {
    const accessToken = this.authService.createAccessToken(member.email);
    const refreshToken = this.authService.createRefreshToken(member.email);

    await this.membersService.setCurrentRefreshToken(
      refreshToken,
      member.email,
    );

    return { accessToken, refreshToken };
  }

  /**
   * Profile 조회
   */
  @Get('profile/:email')
  async profile(@Param('email') email: string): Promise<ProfileResponseDto> {
    const member = await this.membersService.findOneByMember(email);
    const memberName = member.memberName;

    return { email, memberName };
  }
}
