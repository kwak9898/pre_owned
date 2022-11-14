import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsRepository } from './items.repository';
import { CreateItemDto } from './dto/createItem.dto';
import { Members } from '../../entities/members.entity';
import { MEMBER_EXCEPTION } from '../../exception/memberErrorCode';
import { ItemListResponseDto } from './dto/itemListResponse.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemsRepository)
    private itemsRepository: ItemsRepository,
  ) {}

  /**
   * 중고 거래 물품 등록
   */
  createItem(
    createItemDto: CreateItemDto,
    member: Members,
  ): Promise<ItemListResponseDto> {
    if (!member) {
      throw new NotFoundException(MEMBER_EXCEPTION.MEMBER_CODE_NOT_FOUND);
    }

    return this.itemsRepository.createItem(createItemDto, member);
  }
}
