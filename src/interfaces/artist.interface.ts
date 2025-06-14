import { IIdField } from './id-field.interface';

export interface IArtist extends IIdField {
  name: string;
  grammy: boolean;
}

export interface IArtistCreate extends Omit<IArtist, 'id'> {}
