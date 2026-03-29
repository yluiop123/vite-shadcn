import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddBrotherPermissionDto } from './dto/add-brother-permission.dto';
import { AddChildPermissionDto } from './dto/add-child-permission.dto';
import { EditPermissionDto } from './dto/edit-permission.dto';
import { MovePermissionDto } from './dto/move-permission.dto';
import { QueryPermissionDto } from './dto/query-permission.dto';
import { PermissionEntity } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async queryPermissions(
    query?: QueryPermissionDto,
  ): Promise<PermissionEntity[]> {
    const qb = this.permissionRepository.createQueryBuilder('permission');

    if (query?.id) {
      qb.andWhere('permission.id = :id', { id: query.id });
    }
    if (query?.name) {
      qb.andWhere('permission.name ILIKE :name', { name: `%${query.name}%` });
    }
    if (query?.status && query.status !== 'all') {
      qb.andWhere('permission.status = :status', { status: query.status });
    }

    return qb.getMany();
  }

  async deletePermissions(ids: string[]): Promise<void> {
    await this.permissionRepository.delete(ids);
  }

  async movePermission(dto: MovePermissionDto): Promise<void> {
    const permissions = await this.permissionRepository.find();
    const index = permissions.findIndex((x) => x.id === dto.id);
    if (index === -1) throw new NotFoundException('权限不存在');

    if (dto.action === 'top') {
      const [item] = permissions.splice(index, 1);
      permissions.unshift(item);
    } else if (dto.action === 'up' && index > 0) {
      [permissions[index - 1], permissions[index]] = [
        permissions[index],
        permissions[index - 1],
      ];
    } else if (dto.action === 'down' && index < permissions.length - 1) {
      [permissions[index + 1], permissions[index]] = [
        permissions[index],
        permissions[index + 1],
      ];
    }

    await this.permissionRepository.save(permissions);
  }

  async addChild(dto: AddChildPermissionDto): Promise<PermissionEntity> {
    const child = this.permissionRepository.create({
      id: dto.id,
      name: dto.name,
      path: dto.path,
      action: dto.action,
      type: dto.type,
      status: dto.status ?? '1',
      parentId: dto.id,
    });
    return this.permissionRepository.save(child);
  }

  async addBrother(dto: AddBrotherPermissionDto): Promise<PermissionEntity> {
    const source = await this.permissionRepository.findOne({
      where: { id: dto.id },
    });
    if (!source) throw new NotFoundException('权限不存在');

    const brother = this.permissionRepository.create({
      id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      name: dto.name,
      path: dto.path,
      action: dto.action,
      type: dto.type,
      status: dto.status ?? '1',
      parentId: source.parentId,
      order: (source.order ?? 0) + 1,
    });
    return this.permissionRepository.save(brother);
  }

  async editPermission(dto: EditPermissionDto): Promise<PermissionEntity> {
    const permission = await this.permissionRepository.findOne({
      where: { id: dto.id },
    });
    if (!permission) throw new NotFoundException('权限不存在');
    const updated = this.permissionRepository.merge(permission, dto);
    return this.permissionRepository.save(updated);
  }

  async queryPermission(id: string): Promise<PermissionEntity> {
    const item = await this.permissionRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('权限不存在');
    return item;
  }
}
