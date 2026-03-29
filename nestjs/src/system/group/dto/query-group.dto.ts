import { IsIn, IsOptional, IsString, Matches } from 'class-validator';

export class QueryGroupDto {
  @IsOptional()
  @Matches(/^[A-Za-z0-9]+$/)
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @IsIn(['0', '1', 'all'])
  status?: string;
}
