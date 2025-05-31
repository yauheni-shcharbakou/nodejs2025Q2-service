import { IUser, IUserCreate } from '../../../interfaces/user.interface';
import { IBaseRepository } from '../base/base.repository.interface';

export interface IUserRepository extends IBaseRepository<IUser, IUserCreate> {}
