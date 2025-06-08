import { OmitType } from '@nestjs/swagger';
import { IArtistCreate } from '../../../models/artist.model';
import { ArtistDto } from '../../../dto/artist.dto';

export class ArtistCreateDto
  extends OmitType(ArtistDto, ['id'] as const)
  implements IArtistCreate {}
