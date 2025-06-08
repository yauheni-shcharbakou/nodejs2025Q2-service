import { Injectable } from '@nestjs/common';
import { IAlbum, IAlbumCreate } from '../../../models/album.model';
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
}
