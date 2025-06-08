import { PickType } from '@nestjs/swagger';
import { IArtistCreate } from '../../../models/artist.model';
import { ArtistDto } from '../../../dto/artist.dto';

export class ArtistCreateDto
  extends PickType(ArtistDto, ['name', 'grammy'] as const)
  implements IArtistCreate {}
