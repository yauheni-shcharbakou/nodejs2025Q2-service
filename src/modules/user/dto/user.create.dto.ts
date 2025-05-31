import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { IUserCreate } from '../../../interfaces/user.interface';
import { UserPublicDto } from './user.public.dto';

export class UserCreateDto
  extends PickType(UserPublicDto, ['login'] as const)
  implements IUserCreate
{
  @IsNotEmpty()
  @IsString()
  password: string;
}
