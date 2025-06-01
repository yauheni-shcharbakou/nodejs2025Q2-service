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
import { ArtistCreateDto } from './dto/artist.create.dto';
import { ArtistDto } from '../../dto/artist.dto';
import { ArtistService } from './artist.service';
import { plainToInstance } from 'class-transformer';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll(): Promise<ArtistDto[]> {
    const result = await this.artistService.findAll();
    return result.map((artist) => plainToInstance(ArtistDto, artist));
  }

  @Get(':id')
  async findByIdOrException(@Param() params: IdFieldDto): Promise<ArtistDto> {
    const artist = await this.artistService.findById(params.id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return plainToInstance(ArtistDto, artist);
  }

  @Post()
  async create(@Body() body: ArtistCreateDto): Promise<ArtistDto> {
    const artist = await this.artistService.create(body);
    return plainToInstance(ArtistDto, artist);
  }

  @Put(':id')
  async updateByIdOrException(
    @Param() params: IdFieldDto,
    @Body() body: ArtistCreateDto,
  ): Promise<ArtistDto> {
    const { errors, updatedArtist } = await this.artistService.updateById(
      params.id,
      body,
    );

    if (errors.notFound) {
      throw new NotFoundException('Artist not found');
    }

    return plainToInstance(ArtistDto, updatedArtist);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteByIdOrException(@Param() params: IdFieldDto): Promise<void> {
    const result = await this.artistService.deleteById(params.id);

    if (!result) {
      throw new NotFoundException('Artist not found');
    }
  }
}
