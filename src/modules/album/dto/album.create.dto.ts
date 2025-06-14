import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { TransformToNullableId } from '../../../decorators/transfrom.decorator';
import { IsUUIDOrNull } from '../../../decorators/validation.decorator';
import { IAlbumCreate } from '../../../interfaces/album.interface';
import { AlbumDto } from '../../../dto/album.dto';

export class AlbumCreateDto
  extends OmitType(AlbumDto, ['id', 'artistId'] as const)
  implements IAlbumCreate
{
  @ApiProperty({ required: false, nullable: true, format: 'uuid' })
  @IsOptional()
  @IsUUIDOrNull()
  @TransformToNullableId()
  artistId: string | null;
}
