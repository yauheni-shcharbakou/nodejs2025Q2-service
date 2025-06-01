import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { TransformToNullableId } from '../decorators/transfrom.decorator';
import { IsUUIDOrNull } from '../decorators/validation.decorator';
import { IdFieldDto } from './id-field.dto';
import { IAlbum } from '../interfaces/album.interface';

export class AlbumDto extends IdFieldDto implements IAlbum {
  @ApiProperty({ description: 'Album name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Album year', example: 1991 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  year: number;

  @ApiProperty({ description: 'Artist id', nullable: true })
  @IsUUIDOrNull()
  @TransformToNullableId()
  artistId: string | null;
}
