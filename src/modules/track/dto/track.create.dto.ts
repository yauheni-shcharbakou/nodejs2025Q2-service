import { OmitType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { TransformToNullableId } from '../../../decorators/transfrom.decorator';
import { IsUUIDOrNull } from '../../../decorators/validation.decorator';
import { ITrackCreate } from '../../../interfaces/track.interface';
import { TrackDto } from '../../../dto/track.dto';

export class TrackCreateDto
  extends OmitType(TrackDto, ['albumId', 'artistId', 'id'] as const)
  implements ITrackCreate
{
  @IsOptional()
  @IsUUIDOrNull()
  @TransformToNullableId()
  artistId: string | null;

  @IsOptional()
  @IsUUIDOrNull()
  @TransformToNullableId()
  albumId: string | null;
}
