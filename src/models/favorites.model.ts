import { IAlbum } from './album.model';
import { IArtist } from './artist.model';
import { ITrack } from './track.model';

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
