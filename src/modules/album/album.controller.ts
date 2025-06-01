import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IdFieldDto } from '../../dto/id-field.dto';
import { AlbumCreateDto } from './dto/album.create.dto';
import { AlbumDto } from './dto/album.dto';
import { AlbumService } from './album.service';
import { plainToInstance } from 'class-transformer';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async findAll(): Promise<AlbumDto[]> {
    const result = await this.albumService.findAll();
    return result.map((album) => plainToInstance(AlbumDto, album));
  }

  @Get(':id')
  async findByIdOrException(@Param() params: IdFieldDto): Promise<AlbumDto> {
    const album = await this.albumService.findById(params.id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return plainToInstance(AlbumDto, album);
  }

  @Post()
  async create(@Body() body: AlbumCreateDto): Promise<AlbumDto> {
    const { errors, createdAlbum } =
      await this.albumService.validateAndCreate(body);

    if (errors.artistNotFound) {
      throw new NotFoundException('Artist not found');
    }

    return plainToInstance(AlbumDto, createdAlbum);
  }

  @Put(':id')
  async updateByIdOrException(
    @Param() params: IdFieldDto,
    @Body() body: AlbumCreateDto,
  ): Promise<AlbumDto> {
    const { errors, updatedAlbum } = await this.albumService.updateById(
      params.id,
      body,
    );

    if (errors.artistNotFound) {
      throw new NotFoundException('Artist not found');
    }

    if (errors.albumNotFound) {
      throw new NotFoundException('Album not found');
    }

    return plainToInstance(AlbumDto, updatedAlbum);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteByIdOrException(@Param() params: IdFieldDto): Promise<void> {
    const result = await this.albumService.deleteById(params.id);

    if (!result) {
      throw new NotFoundException('Album not found');
    }
  }
}
