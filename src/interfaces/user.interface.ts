import { IIdField } from './id-field.interface';

export interface IUser extends IIdField {
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface IUserPublic extends Omit<IUser, 'password'> {}

export interface IUserCreate extends Pick<IUser, 'login' | 'password'> {}

export interface IUserUpdatePassword {
  oldPassword: string;
  newPassword: string;
}
