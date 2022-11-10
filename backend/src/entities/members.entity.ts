import { BaseEntitty } from 'src/domains/base/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    name: 'mamber_name',
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
}