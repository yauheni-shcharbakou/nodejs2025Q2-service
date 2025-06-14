import { Inject, Injectable } from '@nestjs/common';
import {
  IUser,
  IUserCreate,
  IUserUpdatePassword,
} from '../../interfaces/user.interface';
import { BaseService } from '../../services/base.service';
import { USER_REPOSITORY } from '../repository/user/user.repository.constants';
import { IUserRepository } from '../repository/user/user.repository.interface';

@Injectable()
export class UserService extends BaseService<IUser, IUserCreate> {
  constructor(
    @Inject(USER_REPOSITORY) protected readonly repository: IUserRepository,
  ) {
    super();
  }

  async updatePassword(id: string, data: IUserUpdatePassword) {
    const errors = {
      notFound: false,
      invalidPassword: false,
    };

    const user = await this.repository.findById(id);

    if (!user) {
      errors.notFound = true;
      return { errors };
    }

    if (user.password !== data.oldPassword) {
      errors.invalidPassword = true;
      return { errors };
    }

    const updatedUser = await this.repository.updateById(user.id, {
      password: data.newPassword,
    });

    return { errors, updatedUser };
  }
}
