import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class QueryRoleDto {
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

  @IsOptional()
  @IsString()
  orderField?: string;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  orderValue?: string;

  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  size?: number;
}
