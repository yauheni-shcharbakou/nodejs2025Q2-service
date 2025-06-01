import { Inject, Injectable } from '@nestjs/common';
import { ITrack, ITrackCreate } from '../../interfaces/track.interface';
import { BaseService } from '../../services/base.service';
import { ALBUM_REPOSITORY } from '../repository/album/album.repository.constants';
import { IAlbumRepository } from '../repository/album/album.repository.interface';
import { TRACK_REPOSITORY } from '../repository/track/track.repository.constants';
import { ITrackRepository } from '../repository/track/track.repository.interface';

@Injectable()
export class TrackService extends BaseService<ITrack, ITrackCreate> {
  constructor(
    @Inject(TRACK_REPOSITORY)
    protected readonly repository: ITrackRepository,
    @Inject(ALBUM_REPOSITORY)
    private readonly albumRepository: IAlbumRepository,
  ) {
    super();
  }

  async validateAndCreate(data: ITrackCreate) {
    const errors = {
      albumNotFound: false,
    };

    if (
      data.albumId &&
      !(await this.albumRepository.existsById(data.albumId))
    ) {
      errors.albumNotFound = true;
      return { errors };
    }

    const createdTrack = await super.create(data);
    return { errors, createdTrack };
  }

  async updateById(id: string, data: ITrackCreate) {
    const errors = {
      albumNotFound: false,
      trackNotFound: false,
    };

    const [track, albumNotFound] = await Promise.all([
      this.repository.findById(id),
      (async () => {
        if (!data.albumId) {
          return false;
        }

        return this.albumRepository.existsById(data.albumId);
      })(),
    ]);

    if (albumNotFound) {
      errors.albumNotFound = albumNotFound;
      return { errors };
    }

    if (!track) {
      errors.trackNotFound = true;
      return { errors };
    }

    const updatedTrack = await this.repository.updateById(track.id, data);
    return { errors, updatedTrack };
  }
}
