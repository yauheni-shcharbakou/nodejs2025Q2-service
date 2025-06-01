import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { AlbumDto } from './album.dto';
import { ArtistDto } from './artist.dto';
import { TrackDto } from './track.dto';
import { IFavorites } from '../interfaces/favorites.interface';

export class FavoritesDto implements IFavorites {
  @IsNotEmpty()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => ArtistDto)
  artists: ArtistDto[];

  @IsNotEmpty()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => AlbumDto)
  albums: AlbumDto[];

  @IsNotEmpty()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => TrackDto)
  tracks: TrackDto[];
}
