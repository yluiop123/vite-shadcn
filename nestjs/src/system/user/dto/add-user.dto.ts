import { IsEmail, IsOptional, IsString } from 'class-validator';

export class AddUserDto {
  @IsString()
  name?: string;

  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  groupId?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
