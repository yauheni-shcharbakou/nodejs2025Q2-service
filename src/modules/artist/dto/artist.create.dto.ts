import { OmitType } from '@nestjs/swagger';
import { IArtistCreate } from '../../../interfaces/artist.interface';
import { ArtistDto } from '../../../dto/artist.dto';

export class ArtistCreateDto
  extends OmitType(ArtistDto, ['id'] as const)
  implements IArtistCreate {}
