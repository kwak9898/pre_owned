import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/createItem.dto';
import { Items } from '../../entities/items.entity';
import { Members } from '../../entities/members.entity';
import { CurrentMember } from '../../decorators/currentMember.decorator';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  /**
   * 중고 거래 물품 등록
   */
  @Post('')
  @HttpCode(200)
  createItem(
    @Body() createItemDto: CreateItemDto,
    @CurrentMember() member: Members,
  ): Promise<Items> {
    return this.itemsService.createItem(createItemDto, member);
  }
}
