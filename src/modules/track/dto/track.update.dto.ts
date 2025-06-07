import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { ITrack } from '../../../interfaces/track.interface';
import { TrackDto } from '../../../dto/track.dto';

export class TrackUpdateDto
  extends PartialType(TrackDto)
  implements Partial<ITrack> {}

export class TrackUpdateManyDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => TrackUpdateDto)
  filter: TrackUpdateDto;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => TrackUpdateDto)
  update: TrackUpdateDto;
}
