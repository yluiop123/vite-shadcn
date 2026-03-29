import { IsIn, IsOptional, IsString } from 'class-validator';

export class QueryPermissionDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @IsIn(['0', '1', 'all'])
  status?: string;
}
