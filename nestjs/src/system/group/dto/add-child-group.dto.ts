import { IsInt, IsOptional, IsString } from 'class-validator';

export class AddChildGroupDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  parentId?: string;
}
