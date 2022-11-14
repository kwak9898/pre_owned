import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Items } from '../../entities/items.entity';
import { CreateItemDto } from './dto/createItem.dto';
import { Members } from '../../entities/members.entity';

@Injectable()
export class ItemsRepository extends Repository<Items> {
  constructor(private dataSource: DataSource) {
    super(Items, dataSource.createEntityManager());
  }

  /**
   * 중고 거래 물품 등록
   */
  async createItem(
    createItemDto: CreateItemDto,
    member: Members,
  ): Promise<Items> {
    const { title, itemName, itemPrice, itemContent, type, area } =
      createItemDto;

    const item = this.create({
      title,
      itemName,
      itemPrice,
      itemContent,
      type,
      area,
      member,
    });

    return await this.save(item);
  }
}
