import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { TransformToNullableId } from '../../../decorators/transfrom.decorator';
import { IsUUIDOrNull } from '../../../decorators/validation.decorator';
import { ITrackCreate } from '../../../interfaces/track.interface';
import { TrackDto } from '../../../dto/track.dto';

export class TrackCreateDto
  extends OmitType(TrackDto, ['albumId', 'artistId', 'id'] as const)
  implements ITrackCreate
{
  @ApiProperty({
    description: 'Artist id',
    nullable: true,
    required: false,
    format: 'uuid',
  })
  @IsOptional()
  @IsUUIDOrNull()
  @TransformToNullableId()
  artistId: string | null;

  @ApiProperty({
    description: 'Album id',
    nullable: true,
    required: false,
    format: 'uuid',
  })
  @IsOptional()
  @IsUUIDOrNull()
  @TransformToNullableId()
  albumId: string | null;
}
