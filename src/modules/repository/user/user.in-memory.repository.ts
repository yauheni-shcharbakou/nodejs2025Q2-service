import { Injectable } from '@nestjs/common';
import { IUser, IUserCreate } from '../../../interfaces/user.interface';
import { BaseInMemoryRepository } from '../base/base.in-memory.repository';
import { IUserRepository } from './user.repository.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class UserInMemoryRepository
  extends BaseInMemoryRepository<IUser, IUserCreate>
  implements IUserRepository
{
  async create(data: IUserCreate): Promise<IUser> {
    const currentTimestamp = Date.now();

    const user: IUser = {
      ...data,
      id: randomUUID(),
      version: 1,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    };

    this.entityById.set(user.id, user);
    return user;
  }

  async updateById(
    id: string,
    data: Partial<IUser>,
  ): Promise<IUser | undefined> {
    return super.updateById(id, (user) => ({
      ...data,
      updatedAt: Date.now(),
      version: user.version + 1,
    }));
  }
}
