import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { IdFieldDto } from './id-field.dto';
import { IArtist } from '../interfaces/artist.interface';

export class ArtistDto extends IdFieldDto implements IArtist {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
