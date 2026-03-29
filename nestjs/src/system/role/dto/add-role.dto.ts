import { IsArray, IsOptional, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsArray()
  permissions?: string[];
}
