import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ResponseDto } from '../../common/dto/response.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { DeleteRoleDto } from './dto/delete-role.dto';
import { EditRoleDto } from './dto/edit-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { RoleEntity } from './entities/role.entity';
import { RoleService } from './role.service';

@Controller('api/system/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async queryRoles(
    @Body() query: QueryRoleDto,
  ): Promise<ResponseDto<RoleEntity[]>> {
    const list = await this.roleService.queryRoles(query);
    return ResponseDto.ok(list);
  }

  @Delete()
  async deleteRoles(@Body() dto: DeleteRoleDto): Promise<ResponseDto<string>> {
    await this.roleService.deleteRoles(dto.ids);
    return ResponseDto.ok('操作成功');
  }

  @Post('add')
  async addRole(@Body() dto: AddRoleDto): Promise<ResponseDto<RoleEntity>> {
    const role = await this.roleService.addRole(dto);
    return ResponseDto.ok(role);
  }

  @Post('edit')
  async editRole(@Body() dto: EditRoleDto): Promise<ResponseDto<RoleEntity>> {
    const role = await this.roleService.editRole(dto);
    return ResponseDto.ok(role);
  }

  @Get('detail/:roleId')
  async queryRole(
    @Param('roleId') roleId: string,
  ): Promise<ResponseDto<RoleEntity>> {
    const role = await this.roleService.queryRole(roleId);
    return ResponseDto.ok(role);
  }
}
