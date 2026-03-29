import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'sys_user' })
export class UserEntity {
  @PrimaryColumn('varchar')
  id!: string;

  @Column('varchar')
  name?: string;

  @Column('varchar')
  username?: string;

  @Column('varchar', { nullable: true })
  password?: string;

  @Column('varchar', { nullable: true })
  email?: string;

  @Column('varchar', { nullable: true })
  groupId?: string;

  @Column('varchar', { nullable: true })
  groupName?: string;

  @Column('varchar', { nullable: true })
  phone?: string;

  @Column('varchar', { nullable: true })
  status?: string;

  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp with time zone',
    nullable: true,
  })
  createTime?: Date;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'timestamp with time zone',
    nullable: true,
  })
  updateTime?: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
