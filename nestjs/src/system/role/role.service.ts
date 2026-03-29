import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddRoleDto } from './dto/add-role.dto';
import { EditRoleDto } from './dto/edit-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async queryRoles(query: QueryRoleDto): Promise<RoleEntity[]> {
    const qb = this.roleRepository.createQueryBuilder('role');

    if (query.id) {
      qb.andWhere('role.id = :id', { id: query.id });
    }
    if (query.name) {
      qb.andWhere('role.name ILIKE :name', { name: `%${query.name}%` });
    }
    if (query.status && query.status !== 'all') {
      qb.andWhere('role.status = :status', { status: query.status });
    }
    if (query.orderField) {
      qb.orderBy(
        `role.${query.orderField}`,
        query.orderValue?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
      );
    }

    if (query.page && query.size) {
      qb.skip((query.page - 1) * query.size).take(query.size);
    }

    return qb.getMany();
  }

  async deleteRoles(ids: string[]): Promise<void> {
    await this.roleRepository.delete(ids);
  }

  async addRole(dto: AddRoleDto): Promise<RoleEntity> {
    const role = this.roleRepository.create({
      id: dto.id ?? `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      name: dto.name,
      status: '1',
      permissions: dto.permissions ?? [],
    });
    return this.roleRepository.save(role);
  }

  async editRole(dto: EditRoleDto): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne({ where: { id: dto.id } });
    if (!role) {
      throw new NotFoundException('角色不存在');
    }
    const updated = this.roleRepository.merge(role, dto, {
      updateTime: new Date(),
    });
    return this.roleRepository.save(updated);
  }

  async queryRole(id: string): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException('角色不存在');
    }
    return role;
  }
}
