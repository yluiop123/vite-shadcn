import { Module } from '@nestjs/common';
import { GroupModule } from './group/group.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, RoleModule, PermissionModule, GroupModule],
  exports: [UserModule, RoleModule, PermissionModule, GroupModule],
})
export class SystemModule {}
