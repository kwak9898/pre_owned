import { OmitType } from '@nestjs/swagger';
import { Items } from '../../../entities/items.entity';
import { omit } from '../../../utils/dto.utils';

export class ItemListResponseDto extends OmitType(Items, [
  'member',
  'updatedAt',
  'deletedAt',
]) {
  memberName: string;

  constructor(partial?: Partial<Items>) {
    super();
    return omit(partial, ['member', 'updatedAt', 'deletedAt']);
  }
}
