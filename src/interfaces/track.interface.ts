import { IIdField } from './id-field.interface';

export interface ITrack extends IIdField {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface ITrackCreate extends Omit<ITrack, 'id'> {}
