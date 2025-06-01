import { Inject, Injectable } from '@nestjs/common';
import { IAlbum, IAlbumCreate } from '../../interfaces/album.interface';
import { BaseService } from '../../services/base.service';
import { ALBUM_REPOSITORY } from '../repository/album/album.repository.constants';
import { IAlbumRepository } from '../repository/album/album.repository.interface';
import { TRACK_REPOSITORY } from '../repository/track/track.repository.constants';
import { ITrackRepository } from '../repository/track/track.repository.interface';

@Injectable()
export class AlbumService extends BaseService<IAlbum, IAlbumCreate> {
  constructor(
    @Inject(ALBUM_REPOSITORY)
    protected readonly repository: IAlbumRepository,
    @Inject(TRACK_REPOSITORY)
    private readonly trackRepository: ITrackRepository,
  ) {
    super();
  }

  async updateById(id: string, data: IAlbumCreate) {
    const errors = {
      albumNotFound: false,
    };

    const album = await this.repository.findById(id);

    if (!album) {
      errors.albumNotFound = true;
      return { errors };
    }

    const updatedAlbum = await this.repository.updateById(album.id, data);

    if (data.artistId !== album.artistId) {
      await this.trackRepository.updateMany(
        { artistId: album.artistId },
        { albumId: data.artistId },
      );
    }

    return { errors, updatedAlbum };
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await super.deleteById(id);
    await this.trackRepository.updateMany({ albumId: id }, { albumId: null });
    return result;
  }
}
