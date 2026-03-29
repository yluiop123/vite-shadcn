import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { PermissionGuard } from '../../auth/permission.guard';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PageDataDto } from '../../common/dto/page-data.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { AddUserDto } from './dto/add-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UserBeanDto } from './dto/user-bean.dto';
import { UserService } from './user.service';

@Controller('api/system/users')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @RequirePermissions('user:query')
  async queryUsers(
    @Body() query: QueryUserDto,
  ): Promise<ResponseDto<PageDataDto<UserBeanDto>>> {
    const pageData = await this.userService.queryUsers(query);
    return ResponseDto.ok(pageData);
  }

  @Delete()
  @RequirePermissions('user:delete')
  async deleteUsers(@Body() dto: DeleteUserDto): Promise<ResponseDto<string>> {
    await this.userService.deleteUsers(dto.ids);
    return ResponseDto.ok('删除成功');
  }

  @Post('add')
  @RequirePermissions('user:add')
  async addUser(@Body() dto: AddUserDto): Promise<ResponseDto<UserBeanDto>> {
    const user = await this.userService.addUser(dto);
    return ResponseDto.ok(user);
  }

  @Post('edit')
  @RequirePermissions('user:edit')
  async editUser(@Body() dto: EditUserDto): Promise<ResponseDto<UserBeanDto>> {
    const user = await this.userService.editUser(dto);
    return ResponseDto.ok(user);
  }

  @Post('reset/:userId')
  @RequirePermissions('user:reset')
  async resetUser(
    @Param('userId') userId: string,
  ): Promise<ResponseDto<string>> {
    await this.userService.resetUser(userId);
    return ResponseDto.ok('操作成功');
  }

  @Get('detail/:userId')
  @RequirePermissions('user:detail')
  async queryUser(
    @Param('userId') userId: string,
  ): Promise<ResponseDto<UserBeanDto>> {
    const user = await this.userService.queryUser(userId);
    return ResponseDto.ok(user);
  }
}
