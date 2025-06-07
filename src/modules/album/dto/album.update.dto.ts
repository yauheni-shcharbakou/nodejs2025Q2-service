import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { AlbumDto } from '../../../dto/album.dto';
import { IAlbum } from '../../../interfaces/album.interface';

export class AlbumUpdateDto
  extends PartialType(AlbumDto)
  implements Partial<IAlbum> {}

export class AlbumUpdateManyDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => AlbumUpdateDto)
  filter: AlbumUpdateDto;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => AlbumUpdateDto)
  update: AlbumUpdateDto;
}
