import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IUserCreate } from '../../../interfaces/user.interface';
import { UserDto } from '../../../dto/user.dto';

export class UserCreateDto
  extends PickType(UserDto, ['login'] as const)
  implements IUserCreate
{
  @ApiProperty({ description: 'User password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
