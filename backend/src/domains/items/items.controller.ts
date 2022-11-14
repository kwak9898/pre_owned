import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/createItem.dto';
import { Members } from '../../entities/members.entity';
import { CurrentMember } from '../../decorators/currentMember.decorator';
import { ItemListResponseDto } from './dto/itemListResponse.dto';
import { MyPaginationQuery } from '../base/paginationQuery';
import { Pagination } from 'nestjs-typeorm-paginate';

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
  ): Promise<ItemListResponseDto> {
    return this.itemsService.createItem(createItemDto, member);
  }

  /**
   * 중고 거래 물품 전체 조회
   */
  @Get('')
  getAllByItems(
    @Query() query: MyPaginationQuery,
  ): Promise<Pagination<ItemListResponseDto>> {
    return this.itemsService.getAllByItems(query);
  }

  /**
   * 중고 거래 물품 상세 조회
   */
  @Get('/:itemId')
  findOneByItem(
    @Param('itemId') itemId: number,
    @CurrentMember() member: Members,
  ): Promise<ItemListResponseDto> {
    return this.itemsService.findOneByItem(itemId);
  }
}
