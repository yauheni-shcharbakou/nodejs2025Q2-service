import { OmitType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { TransformToNullableId } from '../../../decorators/transfrom.decorator';
import { IsUUIDOrNull } from '../../../decorators/validation.decorator';
import { IAlbumCreate } from '../../../interfaces/album.interface';
import { AlbumDto } from './album.dto';

export class AlbumCreateDto
  extends OmitType(AlbumDto, ['id', 'artistId'] as const)
  implements IAlbumCreate
{
  @IsOptional()
  @IsUUIDOrNull()
  @TransformToNullableId()
  artistId: string | null;
}
