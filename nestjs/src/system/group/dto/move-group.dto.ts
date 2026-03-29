import { IsIn, IsString } from 'class-validator';

export class MoveGroupDto {
  @IsString()
  id: string;

  @IsString()
  @IsIn(['up', 'down', 'top'])
  action: string;
}
