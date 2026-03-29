import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserEntity } from '../system/user/entities/user.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!requiredPermissions) {
      return true; // 如果没有设置权限要求，则允许访问
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user: UserEntity = request.user as UserEntity;

    if (!user) {
      return false;
    }

    // 暂时允许所有已认证用户访问，后面可以实现从数据库查询用户权限
    return true;
  }
}
