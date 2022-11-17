import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsRepository } from './items.repository';
import { CreateItemDto } from './dto/createItem.dto';
import { Members } from '../../entities/members.entity';
import { MEMBER_EXCEPTION } from '../../exception/memberErrorCode';
import { ItemListResponseDto } from './dto/itemListResponse.dto';
import { ITEM_EXCEPTION } from '../../exception/itemErrorCode';
import { MyPaginationQuery } from '../base/paginationQuery';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { MyPagination } from '../base/paginationResponse';
import { UpdateItemDto } from './dto/updateItem.dto';
import { Items } from '../../entities/items.entity';

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

  /**
   * 중고 거래 물품 전체 조회
   */
  async getAllByItems(
    options: MyPaginationQuery,
  ): Promise<Pagination<ItemListResponseDto>> {
    const queryBuilder = await this.itemsRepository.createQueryBuilder('item');
    queryBuilder.innerJoinAndSelect('item.member', 'member');
    const result = await paginate(queryBuilder, options);

    const data = result.items.map((item) => {
      const dto = new ItemListResponseDto(item);
      dto.memberName = item.member.memberName;
      return dto;
    });

    return new MyPagination<ItemListResponseDto>(data, result.meta);
  }

  /**
   * 중고 거래 물품 상세 조회
   */
  async findOneByItem(itemId: number): Promise<ItemListResponseDto> {
    const queryBuilder = await this.itemsRepository
      .createQueryBuilder('item')
      .innerJoinAndSelect('item.member', 'member')
      .where('item.itemId = :itemId', { itemId })
      .getOne();

    if (queryBuilder === null) {
      throw new NotFoundException(ITEM_EXCEPTION.ITEM_CODE_NOT_FOUND);
    }

    const dto = new ItemListResponseDto(queryBuilder);
    dto.memberName = queryBuilder.member.memberName;
    return dto;
  }

  /**
   * 중고 거래 물품 정보 수정
   */
  async updateByItem(
    itemId: number,
    updateItemDto: UpdateItemDto,
  ): Promise<Items> {
    const { title, itemName, itemPrice, itemContent, area, type } =
      updateItemDto;
    const item = await this.findOneByItem(itemId);

    return await this.itemsRepository.save(item);
  }
}
