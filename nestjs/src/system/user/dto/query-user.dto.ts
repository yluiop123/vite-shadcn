import { IsInt, IsOptional, IsString } from 'class-validator';

export class QueryUserDto {
  @IsOptional()
  @IsString()
  filterField?: string;

  @IsOptional()
  @IsString()
  filterValue?: string;

  @IsOptional()
  @IsString()
  groupId?: string;

  @IsOptional()
  @IsString()
  orderField?: string;

  @IsOptional()
  @IsString()
  orderValue?: 'asc' | 'desc';

  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  size?: number;
}
