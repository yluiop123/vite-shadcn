import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../system/user/entities/user.entity';
import { UserService } from '../system/user/user.service';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userService.findByUsername(username);
    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      return user;
    }
    return null;
  }

  login(user: UserEntity) {
    const payload: JwtPayload = { sub: user.id, username: user.username! };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        roles: [], // 暂时为空，后面可以从角色表获取
        permissions: [], // 暂时为空，后面可以从权限表获取
      },
    };
  }

  async register(createUserDto: {
    username: string;
    password: string;
    name: string;
    email?: string;
  }) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
      id: Date.now().toString(), // 简单ID生成
    });
    return this.login(user);
  }
}
