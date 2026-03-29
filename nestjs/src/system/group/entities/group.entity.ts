import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'sys_group' })
export class GroupEntity {
  @PrimaryColumn('varchar')
  id!: string;

  @Column('varchar')
  name!: string;

  @Column('int', { nullable: true })
  order?: number;

  @Column('varchar', { default: '1' })
  status?: string;

  @Column('varchar', { nullable: true })
  parentId?: string | null;

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

  constructor(partial: Partial<GroupEntity>) {
    Object.assign(this, partial);
  }
}
