import { IsIn, IsString } from 'class-validator';

export class MovePermissionDto {
  @IsString()
  id: string;

  @IsString()
  @IsIn(['up', 'down', 'top'])
  action: string;
}
