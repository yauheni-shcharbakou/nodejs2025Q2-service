import { OmitType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { IsUUIDOrNull } from '../../../decorators/dto.decorator';
import { ITrackCreate } from '../../../interfaces/track.interface';
import { TrackDto } from './track.dto';

export class TrackCreateDto
  extends OmitType(TrackDto, ['albumId', 'artistId'] as const)
  implements ITrackCreate
{
  @IsOptional()
  @IsUUIDOrNull()
  artistId?: string | null;

  @IsOptional()
  @IsUUIDOrNull()
  albumId?: string | null;
}
