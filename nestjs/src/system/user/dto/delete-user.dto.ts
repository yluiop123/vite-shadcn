import { ArrayNotEmpty, IsArray } from 'class-validator';

export class DeleteUserDto {
  @IsArray()
  @ArrayNotEmpty()
  ids!: string[];
}
