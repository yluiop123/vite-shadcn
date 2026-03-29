import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'sys_role' })
export class RoleEntity {
  @PrimaryColumn('varchar')
  id!: string;

  @Column('varchar')
  name?: string;

  @Column('varchar', { default: '1' })
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

  @Column('text', { array: true, default: [] })
  permissions?: string[];

  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
}
