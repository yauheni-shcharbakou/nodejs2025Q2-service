import { IIdField } from '../interfaces/id-field.interface';
import { IArtist } from './artist.model';

export interface IAlbum extends IIdField {
  name: string;
  year: number;
  artist?: IArtist;
  artistId: string | null;
}

export interface IAlbumCreate
  extends Pick<IAlbum, 'name' | 'year' | 'artistId'> {}

export interface IAlbumFilter extends Partial<IAlbumCreate> {}
