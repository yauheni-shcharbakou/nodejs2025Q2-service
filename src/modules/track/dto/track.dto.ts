import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsUUIDOrNull } from '../../../decorators/dto.decorator';
import { IdFieldDto } from '../../../dto/id-field.dto';
import { ITrack } from '../../../interfaces/track.interface';

export class TrackDto extends IdFieldDto implements ITrack {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUIDOrNull()
  artistId: string | null;

  @IsUUIDOrNull()
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
