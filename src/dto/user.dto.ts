import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { IdFieldDto } from './id-field.dto';
import { IUser } from '../interfaces/user.interface';

export class UserDto extends IdFieldDto implements IUser {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  createdAt: number;

  @IsNotEmpty()
  @IsString()
  login: string;

  @Exclude()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  updatedAt: number;

  @IsNotEmpty()
  @IsNumber()
  version: number;
}
