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
import { TrackCreateDto } from './dto/track.create.dto';
import { TrackDto } from './dto/track.dto';
import { TrackService } from './track.service';
import { plainToInstance } from 'class-transformer';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findMany(): Promise<TrackDto[]> {
    const result = await this.trackService.findMany();
    return result.map((user) => plainToInstance(TrackDto, user));
  }

  @Get(':id')
  async findByIdOrException(@Param() params: IdFieldDto): Promise<TrackDto> {
    const user = await this.trackService.findById(params.id);

    if (!user) {
      throw new NotFoundException('Track not found');
    }

    return plainToInstance(TrackDto, user);
  }

  @Post()
  async create(@Body() body: TrackCreateDto): Promise<TrackDto> {
    const user = await this.trackService.create(body);
    return plainToInstance(TrackDto, user);
  }

  @Put(':id')
  async updateByIdOrException(
    @Param() params: IdFieldDto,
    @Body() body: TrackCreateDto,
  ): Promise<TrackDto> {
    const { errors, updatedTrack } = await this.trackService.updateById(
      params.id,
      body,
    );

    if (errors.notFound) {
      throw new NotFoundException('Track not found');
    }

    return plainToInstance(TrackDto, updatedTrack);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteByIdOrException(@Param() params: IdFieldDto): Promise<void> {
    const result = await this.trackService.deleteById(params.id);

    if (!result) {
      throw new NotFoundException('Track not found');
    }
  }
}
