import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { IUserCreate } from '../../../interfaces/user.interface';
import { UserDto } from './user.dto';

export class UserCreateDto
  extends PickType(UserDto, ['login'] as const)
  implements IUserCreate
{
  @IsNotEmpty()
  @IsString()
  password: string;
}
