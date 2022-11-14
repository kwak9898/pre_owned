import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntitty } from '../domains/base/base.entity';
import { Members } from './members.entity';
import { Items } from './items.entity';

@Entity('comment')
export class Comment extends BaseEntitty {
  @PrimaryGeneratedColumn({
    name: 'comment_id',
    comment: '댓글 고유 아이디',
    type: 'integer',
  })
  commentId: number;

  @Column({
    name: 'comment',
    comment: '댓글 내용',
    type: 'varchar',
  })
  comment: string;

  @ManyToOne(() => Members, (member) => member.commentList)
  @JoinColumn({ name: 'member_id', referencedColumnName: 'memberId' })
  member: Members;

  @ManyToOne(() => Items, (item) => item.commentList)
  @JoinColumn({ name: 'item_id', referencedColumnName: 'itemId' })
  item: Items;
}
