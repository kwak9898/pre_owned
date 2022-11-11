import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MembersRepository } from './members.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Members } from 'src/entities/members.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Members])],
  providers: [MembersService, MembersRepository],
  controllers: [MembersController],
  exports: [MembersService, MembersRepository],
})
export class MembersModule {}
