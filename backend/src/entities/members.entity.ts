import { BaseEntitty } from 'src/domains/base/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Comment } from './comment.entity';
import { Items } from './items.entity';

@Entity('members')
export class Members extends BaseEntitty {
  @PrimaryGeneratedColumn({
    name: 'member_id',
    comment: 'member 고유 아이디',
    type: 'integer',
  })
  memberId: number;

  @Column({
    name: 'email',
    comment: 'member의 email 주소',
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    name: 'member_name',
    comment: 'member의 이름',
    type: 'varchar',
    unique: true,
  })
  memberName: string;

  @Column({
    name: 'password',
    comment: '비밀번호',
    type: 'varchar',
    select: false,
  })
  password: string;

  @Column({
    name: 'jwt_token',
    comment: 'jwt refresh token',
    type: 'varchar',
    nullable: true,
  })
  jwtToken?: string;

  @OneToMany(() => Items, (item) => item.member)
  @JoinColumn({ name: 'item_id', referencedColumnName: 'itemId' })
  itemList: Items[];

  @OneToMany(() => Comment, (comment) => comment.member)
  @JoinColumn({ name: 'comment_id', referencedColumnName: 'commentId' })
  commentList: Comment[];

  async hashPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 12);
  }
}
