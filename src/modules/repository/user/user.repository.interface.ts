import {
  IUser,
  IUserCreate,
  IUserUpdate,
} from '../../../interfaces/user.interface';
import { IBaseRepository } from '../base/base.repository.interface';

export interface IUserRepository
  extends IBaseRepository<IUser, IUserCreate, IUserUpdate, IUserUpdate> {}
