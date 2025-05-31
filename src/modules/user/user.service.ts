import { Inject, Injectable } from '@nestjs/common';
import {
  IUser,
  IUserCreate,
  IUserUpdatePassword,
} from '../../interfaces/user.interface';
import { USER_REPOSITORY } from '../repository/user/user.repository.constants';
import { IUserRepository } from '../repository/user/user.repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async findMany(): Promise<IUser[]> {
    return this.userRepository.findMany();
  }

  async findById(id: string): Promise<IUser | undefined> {
    return this.userRepository.findById(id);
  }

  async create(data: IUserCreate): Promise<IUser> {
    return this.userRepository.create(data);
  }

  async updatePassword(id: string, data: IUserUpdatePassword) {
    const errors = {
      notFound: false,
      invalidPassword: false,
    };

    const user = await this.userRepository.findById(id);

    if (!user) {
      errors.notFound = true;
      return { errors };
    }

    const updatedUser = await this.userRepository.updatePassword(user, data);

    if (!updatedUser) {
      errors.invalidPassword = true;
      return { errors, updatedUser };
    }

    return { errors, updatedUser };
  }

  async deleteById(id: string): Promise<boolean> {
    return this.userRepository.deleteById(id);
  }
}
