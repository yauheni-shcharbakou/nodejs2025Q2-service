import {
  IUser,
  IUserCreate,
  IUserUpdatePassword,
} from '../../../interfaces/user.interface';

export interface IUserRepository {
  findMany(): Promise<IUser[]>;
  findById(id: string): Promise<IUser | undefined>;
  create(data: IUserCreate): Promise<IUser>;
  updatePassword(
    user: IUser,
    data: IUserUpdatePassword,
  ): Promise<IUser | undefined>;
  deleteById(id: string): Promise<boolean>;
}
