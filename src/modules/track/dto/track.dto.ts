import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TransformToNullableId } from '../../../decorators/transfrom.decorator';
import { IsUUIDOrNull } from '../../../decorators/validation.decorator';
import { IdFieldDto } from '../../../dto/id-field.dto';
import { ITrack } from '../../../interfaces/track.interface';

export class TrackDto extends IdFieldDto implements ITrack {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUIDOrNull()
  @TransformToNullableId()
  artistId: string | null;

  @IsUUIDOrNull()
  @TransformToNullableId()
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
