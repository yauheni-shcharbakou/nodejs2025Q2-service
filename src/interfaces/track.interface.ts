import { IIdField } from './id-field.interface';

export interface ITrack extends IIdField {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface ITrackCreate
  extends Pick<ITrack, 'name' | 'duration'>,
    Partial<Pick<ITrack, 'albumId' | 'artistId'>> {}

export interface ITrackUpdate extends ITrackCreate {}
