import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ResponseDto } from '../../common/dto/response.dto';
import { AddBrotherPermissionDto } from './dto/add-brother-permission.dto';
import { AddChildPermissionDto } from './dto/add-child-permission.dto';
import { EditPermissionDto } from './dto/edit-permission.dto';
import { MovePermissionDto } from './dto/move-permission.dto';
import { QueryPermissionDto } from './dto/query-permission.dto';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionService } from './permission.service';

@Controller('api/system/permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  async queryPermissions(
    @Body() query: QueryPermissionDto,
  ): Promise<ResponseDto<PermissionEntity[]>> {
    const list = await this.permissionService.queryPermissions(query);
    return ResponseDto.ok(list);
  }

  @Delete()
  async deletePermissions(
    @Body() dto: { ids: string[] },
  ): Promise<ResponseDto<string>> {
    await this.permissionService.deletePermissions(dto.ids);
    return ResponseDto.ok('操作成功');
  }

  @Post('move')
  async movePermission(
    @Body() dto: MovePermissionDto,
  ): Promise<ResponseDto<string>> {
    await this.permissionService.movePermission(dto);
    return ResponseDto.ok('操作成功');
  }

  @Post('edit')
  async editPermission(
    @Body() dto: EditPermissionDto,
  ): Promise<ResponseDto<PermissionEntity>> {
    const item = await this.permissionService.editPermission(dto);
    return ResponseDto.ok(item);
  }

  @Get('detail/:permissionId')
  async queryPermission(
    @Param('permissionId') permissionId: string,
  ): Promise<ResponseDto<PermissionEntity>> {
    const item = await this.permissionService.queryPermission(permissionId);
    return ResponseDto.ok(item);
  }

  @Post('addChild')
  async addChild(
    @Body() dto: AddChildPermissionDto,
  ): Promise<ResponseDto<PermissionEntity>> {
    const item = await this.permissionService.addChild(dto);
    return ResponseDto.ok(item);
  }

  @Post('addBrother')
  async addBrother(
    @Body() dto: AddBrotherPermissionDto,
  ): Promise<ResponseDto<PermissionEntity>> {
    const item = await this.permissionService.addBrother(dto);
    return ResponseDto.ok(item);
  }

  @Get()
  async queryAllPermissions(): Promise<ResponseDto<PermissionEntity[]>> {
    const items = await this.permissionService.queryPermissions();
    return ResponseDto.ok(items);
  }
}
