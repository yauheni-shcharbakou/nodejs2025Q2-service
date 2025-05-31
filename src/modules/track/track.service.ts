import { Inject, Injectable } from '@nestjs/common';
import {
  ITrack,
  ITrackCreate,
  ITrackUpdate,
} from '../../interfaces/track.interface';
import { BaseService } from '../../services/base.service';
import { TRACK_REPOSITORY } from '../repository/track/track.repository.constants';
import { ITrackRepository } from '../repository/track/track.repository.interface';

@Injectable()
export class TrackService extends BaseService<ITrack, ITrackCreate> {
  constructor(
    @Inject(TRACK_REPOSITORY)
    protected readonly repository: ITrackRepository,
  ) {
    super();
  }

  async updateById(id: string, data: ITrackUpdate) {
    const errors = {
      notFound: false,
    };

    const track = await this.repository.findById(id);

    if (!track) {
      errors.notFound = true;
      return { errors };
    }

    const updatedTrack = await this.repository.updateById(track.id, data);
    return { errors, updatedTrack };
  }
}
