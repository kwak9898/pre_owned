import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MembersModule } from '../members/members.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.starategy';
import { MembersRepository } from '../members/members.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MembersModule, PassportModule],
  providers: [AuthService, LocalStrategy, MembersRepository],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
