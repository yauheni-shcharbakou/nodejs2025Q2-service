import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { TransformToNullableId } from '../decorators/transfrom.decorator';
import { IsUUIDOrNull } from '../decorators/validation.decorator';
import { IdFieldDto } from './id-field.dto';
import { IAlbum } from '../interfaces/album.interface';

export class AlbumDto extends IdFieldDto implements IAlbum {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  year: number;

  @IsUUIDOrNull()
  @TransformToNullableId()
  artistId: string | null;
}
