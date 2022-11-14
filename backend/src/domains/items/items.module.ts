import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from '../../entities/items.entity';
import { ItemsRepository } from './items.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Items])],
  providers: [ItemsService, ItemsRepository],
  controllers: [ItemsController],
})
export class ItemsModule {}
