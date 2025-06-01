import { IAlbum } from './album.interface';
import { IArtist } from './artist.interface';
import { ITrack } from './track.interface';

export interface IFavorites {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}

export interface IFavoritesAdd {
  artist?: IArtist;
  album?: IAlbum;
  track?: ITrack;
}

export interface IFavoritesDelete {
  artist?: string;
  album?: string;
  track?: string;
}
