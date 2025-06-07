import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IAlbum, IAlbumCreate } from '../../../interfaces/album.interface';
import { IAlbumRepository } from './album.repository.interface';

@Injectable()
export class AlbumPrismaRepository implements IAlbumRepository {
  constructor(protected readonly model: Prisma.AlbumDelegate) {}

  async existsById(id: string): Promise<boolean> {
    const artist = await this.findById(id);
    return !!artist;
  }

  async findAll(): Promise<IAlbum[]> {
    return this.model.findMany();
  }

  async findById(id: string): Promise<IAlbum> {
    return this.model.findUnique({ where: { id } });
  }

  async create({ artistId, ...data }: IAlbumCreate): Promise<IAlbum> {
    return this.model.create({
      data: {
        ...data,
        artist: artistId ? { connect: { id: artistId } } : undefined,
      },
    });
  }

  async updateById(
    id: string,
    { artistId, ...data }: Partial<IAlbum>,
  ): Promise<IAlbum | undefined> {
    return this.model.update({
      where: { id },
      data: {
        ...data,
        artist: artistId ? { connect: { id: artistId } } : undefined,
      },
    });
  }

  async updateMany(
    filter: Partial<IAlbum>,
    updateData: Partial<IAlbum>,
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
