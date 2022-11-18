import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntitty } from '../domains/base/base.entity';
import { Comment } from './comment.entity';
import { Members } from './members.entity';

@Entity('items')
export class Items extends BaseEntitty {
  @PrimaryGeneratedColumn({
    name: 'item_id',
    comment: 'item 고유 아이디',
    type: 'integer',
  })
  itemId: number;

  @Column({
    name: 'item_title',
    comment: 'item title',
    type: 'varchar',
  })
  title: string;

  @Column({
    name: 'item_name',
    comment: 'item 이름',
    type: 'varchar',
  })
  itemName: string;

  @Column({
    name: 'item_price',
    comment: 'item 가격',
    type: 'int',
  })
  itemPrice: number;

  @Column({
    name: 'item_content',
    comment: 'item content',
    type: 'varchar',
  })
  itemContent: string;

  @Column({
    name: 'area',
    comment: '중고 거래 장소',
    type: 'varchar',
  })
  area: string;

  @Column({
    name: 'item_type',
    comment: '중고 거래 물품 타입',
    type: 'varchar',
  })
  type: string;

  @ManyToOne(() => Members, (member) => member.itemList, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'member_id', referencedColumnName: 'memberId' })
  member: Members;

  @OneToMany(() => Comment, (comment) => comment.item, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'comment_id', referencedColumnName: 'commentId' })
  commentList: Comment[];
}
