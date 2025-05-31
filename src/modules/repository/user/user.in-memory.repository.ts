import { Injectable } from '@nestjs/common';
import {
  IUser,
  IUserCreate,
  IUserUpdatePassword,
} from '../../../interfaces/user.interface';
import { IUserRepository } from './user.repository.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class UserInMemoryRepository implements IUserRepository {
  private userById = new Map<string, IUser>();

  async findMany(): Promise<IUser[]> {
    return Array.from(this.userById.values());
  }

  async findById(id: string): Promise<IUser | undefined> {
    return this.userById.get(id);
  }

  async create(data: IUserCreate): Promise<IUser> {
    const currentTimestamp = Date.now();

    const user: IUser = {
      ...data,
      id: randomUUID(),
      version: 1,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    };

    this.userById.set(user.id, user);
    return user;
  }

  async updatePassword(
    user: IUser,
    data: IUserUpdatePassword,
  ): Promise<IUser | undefined> {
    if (data.oldPassword !== user.password) {
      return;
    }

    user.password = data.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;
    return user;
  }

  async deleteById(id: string): Promise<boolean> {
    if (!this.userById.has(id)) {
      return false;
    }

    this.userById.delete(id);
    return true;
  }
}
