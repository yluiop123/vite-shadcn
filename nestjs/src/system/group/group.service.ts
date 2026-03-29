import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddBrotherGroupDto } from './dto/add-brother-group.dto';
import { AddChildGroupDto } from './dto/add-child-group.dto';
import { EditGroupDto } from './dto/edit-group.dto';
import { MoveGroupDto } from './dto/move-group.dto';
import { QueryGroupDto } from './dto/query-group.dto';
import { GroupEntity } from './entities/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  async queryGroups(query?: QueryGroupDto): Promise<GroupEntity[]> {
    const qb = this.groupRepository.createQueryBuilder('group');

    if (query?.id) {
      qb.andWhere('group.id = :id', { id: query.id });
    }
    if (query?.name) {
      qb.andWhere('group.name ILIKE :name', { name: `%${query.name}%` });
    }
    if (query?.status && query.status !== 'all') {
      qb.andWhere('group.status = :status', { status: query.status });
    }

    return qb.getMany();
  }

  async deleteGroups(ids: string[]): Promise<void> {
    await this.groupRepository.delete(ids);
  }

  async moveGroup(dto: MoveGroupDto): Promise<void> {
    const groups = await this.groupRepository.find();
    const index = groups.findIndex((x) => x.id === dto.id);
    if (index === -1) throw new NotFoundException('组织不存在');

    if (dto.action === 'top') {
      const [item] = groups.splice(index, 1);
      groups.unshift(item);
    } else if (dto.action === 'up' && index > 0) {
      [groups[index - 1], groups[index]] = [groups[index], groups[index - 1]];
    } else if (dto.action === 'down' && index < groups.length - 1) {
      [groups[index + 1], groups[index]] = [groups[index], groups[index + 1]];
    }

    await this.groupRepository.save(groups);
  }

  async addChild(dto: AddChildGroupDto): Promise<GroupEntity> {
    const item = this.groupRepository.create({
      id: dto.id,
      name: dto.name,
      order: dto.order ?? 0,
      status: dto.status ?? '1',
      parentId: dto.id,
    });
    return this.groupRepository.save(item);
  }

  async addBrother(dto: AddBrotherGroupDto): Promise<GroupEntity> {
    const source = await this.groupRepository.findOne({
      where: { id: dto.id },
    });
    if (!source) throw new NotFoundException('组织不存在');

    const item = this.groupRepository.create({
      id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      name: dto.name,
      order: (source.order ?? 0) + 1,
      status: dto.status ?? '1',
      parentId: source.parentId,
    });
    return this.groupRepository.save(item);
  }

  async editGroup(dto: EditGroupDto): Promise<GroupEntity> {
    const group = await this.groupRepository.findOne({ where: { id: dto.id } });
    if (!group) throw new NotFoundException('组织不存在');

    const updated = this.groupRepository.merge(group, dto);
    return this.groupRepository.save(updated);
  }

  async queryGroup(id: string): Promise<GroupEntity> {
    const group = await this.groupRepository.findOne({ where: { id } });
    if (!group) throw new NotFoundException('组织不存在');
    return group;
  }
}
