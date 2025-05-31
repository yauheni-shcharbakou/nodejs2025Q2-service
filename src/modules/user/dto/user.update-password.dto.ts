import { IsNotEmpty, IsString } from 'class-validator';
import { IUserUpdatePassword } from '../../../interfaces/user.interface';

export class UserUpdatePasswordDto implements IUserUpdatePassword {
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  oldPassword: string;
}
