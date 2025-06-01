import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AlbumDto } from './album.dto';
import { ArtistDto } from './artist.dto';
import { TrackDto } from './track.dto';
import { IFavorites } from '../interfaces/favorites.interface';

export class FavoritesDto implements IFavorites {
  @ApiProperty({ type: [ArtistDto] })
  @IsNotEmpty()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => ArtistDto)
  artists: ArtistDto[];

  @ApiProperty({ type: [AlbumDto] })
  @IsNotEmpty()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => AlbumDto)
  albums: AlbumDto[];

  @ApiProperty({ type: [TrackDto] })
  @IsNotEmpty()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => TrackDto)
  tracks: TrackDto[];
}

export class FavoritesAddResultDto {
  @ApiProperty({ description: 'Result message' })
  @IsNotEmpty()
  @IsString()
  message: string;
}
