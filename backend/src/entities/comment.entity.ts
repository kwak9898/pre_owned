import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntitty } from '../domains/base/base.entity';

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
}
