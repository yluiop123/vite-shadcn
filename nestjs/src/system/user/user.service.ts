import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { PageDataDto } from '../../common/dto/page-data.dto';
import { AddUserDto } from './dto/add-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UserBeanDto } from './dto/user-bean.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async queryUsers(query: QueryUserDto): Promise<PageDataDto<UserBeanDto>> {
    const qb = this.userRepository.createQueryBuilder('user');

    if (query.groupId) {
      qb.andWhere('user.groupId = :groupId', { groupId: query.groupId });
    }

    if (query.filterField && query.filterValue) {
      qb.andWhere(`user.${query.filterField} ILIKE :filterValue`, {
        filterValue: `%${query.filterValue}%`,
      });
    }

    if (query.orderField) {
      const order = query.orderValue === 'desc' ? 'DESC' : 'ASC';
      qb.orderBy(`user.${query.orderField}`, order);
    }

    const page = query.page ?? 1;
    const size = query.size ?? 10;
    qb.skip((page - 1) * size).take(size);

    const [items, total] = await qb.getManyAndCount();
    const list = items.map((item) => new UserBeanDto(item));
    return new PageDataDto(total, list);
  }

  async addUser(dto: AddUserDto): Promise<UserBeanDto> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      ...dto,
      password: hashedPassword,
      groupName: `组-${dto.groupId ?? '默认'}`,
    });
    const saved = await this.userRepository.save(user);
    return new UserBeanDto(saved);
  }

  async editUser(dto: EditUserDto): Promise<UserBeanDto> {
    const user = await this.userRepository.findOne({ where: { id: dto.id } });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    const updated = this.userRepository.merge(user, dto, {
      groupName: dto.groupId ? `组-${dto.groupId}` : user.groupName,
      updateTime: new Date(),
    });
    const saved = await this.userRepository.save(updated);
    return new UserBeanDto(saved);
  }

  async deleteUsers(ids: string[]): Promise<void> {
    await this.userRepository.delete(ids);
  }

  async resetUser(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    user.status = 'password-reset';
    user.updateTime = new Date();
    await this.userRepository.save(user);
  }

  async queryUser(id: string): Promise<UserBeanDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    return new UserBeanDto(user);
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async create(userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }
}
