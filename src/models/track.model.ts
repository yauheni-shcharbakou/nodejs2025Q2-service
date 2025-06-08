import { IIdField } from '../interfaces/id-field.interface';
import { IAlbum } from './album.model';
import { IArtist } from './artist.model';

export interface ITrack extends IIdField {
  name: string;
  artist?: IArtist;
  artistId: string | null;
  album?: IAlbum;
  albumId: string | null;
  duration: number;
}

export interface ITrackCreate
  extends Pick<ITrack, 'name' | 'duration' | 'artistId' | 'albumId'> {}

export interface ITrackFilter extends Partial<ITrackCreate> {}
