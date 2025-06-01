import { OmitType } from '@nestjs/mapped-types';
import { IArtistCreate } from '../../../interfaces/artist.interface';
import { ArtistDto } from './artist.dto';

export class ArtistCreateDto
  extends OmitType(ArtistDto, ['id'] as const)
  implements IArtistCreate {}
