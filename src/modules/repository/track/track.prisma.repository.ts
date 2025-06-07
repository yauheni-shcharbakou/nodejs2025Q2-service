import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ITrack, ITrackCreate } from '../../../interfaces/track.interface';
import { ITrackRepository } from './track.repository.interface';

@Injectable()
export class TrackPrismaRepository implements ITrackRepository {
  constructor(protected readonly model: Prisma.TrackDelegate) {}

  async existsById(id: string): Promise<boolean> {
    const artist = await this.findById(id);
    return !!artist;
  }

  async findAll(): Promise<ITrack[]> {
    return this.model.findMany();
  }

  async findById(id: string): Promise<ITrack> {
    return this.model.findUnique({ where: { id } });
  }

  async create({ artistId, albumId, ...data }: ITrackCreate): Promise<ITrack> {
    return this.model.create({
      data: {
        ...data,
        artist: artistId ? { connect: { id: artistId } } : undefined,
        album: albumId ? { connect: { id: albumId } } : undefined,
      },
    });
  }

  async updateById(
    id: string,
    { artistId, albumId, ...data }: Partial<ITrack>,
  ): Promise<ITrack | undefined> {
    return this.model.update({
      where: { id },
      data: {
        ...data,
        artist: artistId ? { connect: { id: artistId } } : undefined,
        album: albumId ? { connect: { id: albumId } } : undefined,
      },
    });
  }

  async updateMany(
    filter: Partial<ITrack>,
    updateData: Partial<ITrack>,
  ): Promise<void> {
    await this.model.updateMany({ where: filter, data: updateData });
  }

  async deleteById(id: string): Promise<boolean> {
    const isExist = await this.existsById(id);

    if (!isExist) {
      return false;
    }

    await this.model.delete({ where: { id } });
    return true;
  }
}
