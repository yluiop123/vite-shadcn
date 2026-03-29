import { IsArray, IsOptional, IsString } from 'class-validator';

export class EditRoleDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsArray()
  permissions?: string[];
}
