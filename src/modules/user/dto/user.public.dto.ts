import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { IdFieldDto } from '../../../dto/id-field.dto';
import { IUserPublic } from '../../../interfaces/user.interface';

export class UserPublicDto extends IdFieldDto implements IUserPublic {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  createdAt: number;

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  updatedAt: number;

  @IsNotEmpty()
  @IsNumber()
  version: number;
}
