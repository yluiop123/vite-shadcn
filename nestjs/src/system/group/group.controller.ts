import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ResponseDto } from '../../common/dto/response.dto';
import { AddBrotherGroupDto } from './dto/add-brother-group.dto';
import { AddChildGroupDto } from './dto/add-child-group.dto';
import { DeleteGroupDto } from './dto/delete-group.dto';
import { EditGroupDto } from './dto/edit-group.dto';
import { MoveGroupDto } from './dto/move-group.dto';
import { QueryGroupDto } from './dto/query-group.dto';
import { GroupEntity } from './entities/group.entity';
import { GroupService } from './group.service';

@Controller('api/system/groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async queryGroups(
    @Body() query: QueryGroupDto,
  ): Promise<ResponseDto<GroupEntity[]>> {
    const list = await this.groupService.queryGroups(query);
    return ResponseDto.ok(list);
  }

  @Delete()
  async deleteGroups(
    @Body() dto: DeleteGroupDto,
  ): Promise<ResponseDto<string>> {
    await this.groupService.deleteGroups(dto.ids);
    return ResponseDto.ok('操作成功');
  }

  @Post('move')
  async moveGroup(@Body() dto: MoveGroupDto): Promise<ResponseDto<string>> {
    await this.groupService.moveGroup(dto);
    return ResponseDto.ok('操作成功');
  }

  @Post('edit')
  async editGroup(
    @Body() dto: EditGroupDto,
  ): Promise<ResponseDto<GroupEntity>> {
    const item = await this.groupService.editGroup(dto);
    return ResponseDto.ok(item);
  }

  @Get('detail/:groupId')
  async queryGroup(
    @Param('groupId') groupId: string,
  ): Promise<ResponseDto<GroupEntity>> {
    const item = await this.groupService.queryGroup(groupId);
    return ResponseDto.ok(item);
  }

  @Post('addChild')
  async addChild(
    @Body() dto: AddChildGroupDto,
  ): Promise<ResponseDto<GroupEntity>> {
    const item = await this.groupService.addChild(dto);
    return ResponseDto.ok(item);
  }

  @Post('addBrother')
  async addBrother(
    @Body() dto: AddBrotherGroupDto,
  ): Promise<ResponseDto<GroupEntity>> {
    const item = await this.groupService.addBrother(dto);
    return ResponseDto.ok(item);
  }

  @Get()
  async queryAllGroups(): Promise<ResponseDto<GroupEntity[]>> {
    const list = await this.groupService.queryGroups();
    return ResponseDto.ok(list);
  }
}
