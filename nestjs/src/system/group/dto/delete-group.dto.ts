import { ArrayNotEmpty, IsArray } from 'class-validator';

export class DeleteGroupDto {
  @IsArray()
  @ArrayNotEmpty()
  ids: string[];
}
