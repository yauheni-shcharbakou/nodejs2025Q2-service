import { IIdField } from '../interfaces/id-field.interface';
import { IArtist } from './artist.model';

export interface IAlbum extends IIdField {
  name: string;
  year: number;
  artist?: IArtist;
  artistId: string | null;
}

export interface IAlbumCreate extends Omit<IAlbum, 'id' | 'artist'> {}
