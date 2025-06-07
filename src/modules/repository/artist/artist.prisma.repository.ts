import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IArtist, IArtistCreate } from '../../../interfaces/artist.interface';
import { IArtistRepository } from './artist.repository.interface';

@Injectable()
export class ArtistPrismaRepository implements IArtistRepository {
  constructor(protected readonly model: Prisma.ArtistDelegate) {}

  async existsById(id: string): Promise<boolean> {
    const user = await this.model.findUnique({ where: { id } });
    return !!user;
  }

  async findAll(): Promise<IArtist[]> {
    return this.model.findMany();
  }

  async findById(id: string): Promise<IArtist> {
    return this.model.findUnique({ where: { id } });
  }

  async create(data: IArtistCreate): Promise<IArtist> {
    return this.model.create({ data });
  }

  async updateById(
    id: string,
    data: Partial<IArtist>,
  ): Promise<IArtist | undefined> {
    return this.model.update({ where: { id }, data });
  }

  async updateMany(
    filter: Partial<IArtist>,
    updateData: Partial<IArtist>,
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
