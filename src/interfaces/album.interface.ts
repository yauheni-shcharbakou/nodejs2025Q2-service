import { IIdField } from './id-field.interface';

export interface IAlbum extends IIdField {
  name: string;
  year: number;
  artistId: string | null;
}

export interface IAlbumCreate extends Omit<IAlbum, 'id'> {}
