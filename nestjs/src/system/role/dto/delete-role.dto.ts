import { ArrayNotEmpty, IsArray } from 'class-validator';

export class DeleteRoleDto {
  @IsArray()
  @ArrayNotEmpty()
  ids: string[];
}
