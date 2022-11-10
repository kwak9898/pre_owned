import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersController } from './domains/members/members.controller';
import { MembersService } from './domains/members/members.service';
import { MembersModule } from './domains/members/members.module';

@Module({
  imports: [MembersModule],
  controllers: [AppController, MembersController],
  providers: [AppService, MembersService],
})
export class AppModule {}
