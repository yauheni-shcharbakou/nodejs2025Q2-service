import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { IdFieldDto } from './id-field.dto';
import { IArtist } from '../interfaces/artist.interface';

export class ArtistDto extends IdFieldDto implements IArtist {
  @ApiProperty({ description: 'Artist name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Is artist has grammy' })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
