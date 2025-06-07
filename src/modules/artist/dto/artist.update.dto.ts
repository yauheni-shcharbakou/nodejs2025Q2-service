import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { ArtistDto } from '../../../dto/artist.dto';
import { IArtist } from '../../../interfaces/artist.interface';

export class ArtistUpdateDto
  extends PartialType(ArtistDto)
  implements Partial<IArtist> {}

export class ArtistUpdateManyDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ArtistUpdateDto)
  filter: ArtistUpdateDto;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ArtistUpdateDto)
  update: ArtistUpdateDto;
}
