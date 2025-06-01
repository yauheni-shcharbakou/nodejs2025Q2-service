import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IdFieldDto } from '../../dto/id-field.dto';
import { FavoritesDto } from '../../dto/favorites.dto';
import { OkResponseDto } from '../../dto/ok.response.dto';
import { FavoritesService } from './favorites.service';
import { plainToInstance } from 'class-transformer';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async find(): Promise<FavoritesDto> {
    const result = await this.favoritesService.find();
    return plainToInstance(FavoritesDto, result);
  }

  @Post('album/:id')
  async addAlbum(@Param() params: IdFieldDto): Promise<OkResponseDto> {
    const result = await this.favoritesService.addAlbum(params.id);

    if (!result) {
      throw new UnprocessableEntityException('Album not found');
    }

    return plainToInstance(OkResponseDto, { ok: true });
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param() params: IdFieldDto): Promise<void> {
    const result = await this.favoritesService.deleteAlbum(params.id);

    if (!result) {
      throw new NotFoundException('Album not found');
    }
  }

  @Post('artist/:id')
  async addArtist(@Param() params: IdFieldDto): Promise<OkResponseDto> {
    const result = await this.favoritesService.addArtist(params.id);

    if (!result) {
      throw new UnprocessableEntityException('Artist not found');
    }

    return plainToInstance(OkResponseDto, { ok: true });
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param() params: IdFieldDto): Promise<void> {
    const result = await this.favoritesService.deleteArtist(params.id);

    if (!result) {
      throw new NotFoundException('Artist not found');
    }
  }

  @Post('track/:id')
  async addTrack(@Param() params: IdFieldDto): Promise<OkResponseDto> {
    const result = await this.favoritesService.addTrack(params.id);

    if (!result) {
      throw new UnprocessableEntityException('Track not found');
    }

    return plainToInstance(OkResponseDto, { ok: true });
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param() params: IdFieldDto): Promise<void> {
    const result = await this.favoritesService.deleteTrack(params.id);

    if (!result) {
      throw new NotFoundException('Track not found');
    }
  }
}
