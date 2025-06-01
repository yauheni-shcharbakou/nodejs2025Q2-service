import { Injectable } from '@nestjs/common';
import { IAlbum, IAlbumCreate } from '../../../interfaces/album.interface';
import { BaseInMemoryRepository } from '../base/base.in-memory.repository';
import { IAlbumRepository } from './album.repository.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class AlbumInMemoryRepository
  extends BaseInMemoryRepository<IAlbum, IAlbumCreate>
  implements IAlbumRepository
{
  async create(data: IAlbumCreate): Promise<IAlbum> {
    const album: IAlbum = {
      ...data,
      id: randomUUID(),
      artistId: data.artistId ?? null,
    };

    this.entityById.set(album.id, album);
    return album;
  }

  // async updateById(
  //   id: string,
  //   data: Partial<IAlbum>,
  // ): Promise<IAlbum | undefined> {
  //   return super.updateById(id, (user) => ({
  //     ...data,
  //     updatedAt: Date.now(),
  //     version: user.version + 1,
  //   }));
  // }
}
