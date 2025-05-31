import { Inject, Injectable } from '@nestjs/common';
import {
  ITrack,
  ITrackCreate,
  ITrackUpdate,
} from '../../interfaces/track.interface';
import { TRACK_REPOSITORY } from '../repository/track/track.repository.constants';
import { ITrackRepository } from '../repository/track/track.repository.interface';

@Injectable()
export class TrackService {
  constructor(
    @Inject(TRACK_REPOSITORY)
    private readonly trackRepository: ITrackRepository,
  ) {}

  async findAll(): Promise<ITrack[]> {
    return this.trackRepository.findAll();
  }

  async findById(id: string): Promise<ITrack | undefined> {
    return this.trackRepository.findById(id);
  }

  async create(data: ITrackCreate): Promise<ITrack> {
    return this.trackRepository.create(data);
  }

  async updateById(id: string, data: ITrackUpdate) {
    const errors = {
      notFound: false,
    };

    const track = await this.trackRepository.findById(id);

    if (!track) {
      errors.notFound = true;
      return { errors };
    }

    const updatedTrack = await this.trackRepository.updateById(track.id, data);
    return { errors, updatedTrack };
  }

  async deleteById(id: string): Promise<boolean> {
    return this.trackRepository.deleteById(id);
  }
}
