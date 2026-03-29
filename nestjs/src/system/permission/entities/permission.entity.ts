import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'sys_permission' })
export class PermissionEntity {
  @PrimaryColumn('varchar')
  id!: string;

  @Column('varchar')
  name!: string;

  @Column('varchar', { nullable: true })
  path?: string;

  @Column('varchar', { nullable: true })
  action?: string;

  @Column('varchar', { nullable: true })
  type?: string;

  @Column('varchar', { default: '1' })
  status?: string;

  @Column('int', { nullable: true })
  order?: number;

  @CreateDateColumn({ name: 'create_time', nullable: true })
  createTime?: Date;

  @UpdateDateColumn({ name: 'update_time', nullable: true })
  updateTime?: Date;

  @Column('varchar', { nullable: true })
  parentId?: string | null;

  constructor(partial: Partial<PermissionEntity>) {
    Object.assign(this, partial);
  }
}
