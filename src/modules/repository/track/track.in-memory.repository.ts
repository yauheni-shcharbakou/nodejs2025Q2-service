import { Injectable } from '@nestjs/common';
import { ITrack, ITrackCreate } from '../../../models/track.model';
import { BaseInMemoryRepository } from '../base/base.in-memory.repository';
import { ITrackRepository } from './track.repository.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class TrackInMemoryRepository
  extends BaseInMemoryRepository<ITrack, ITrackCreate>
  implements ITrackRepository
{
  async create(data: ITrackCreate): Promise<ITrack> {
    const track: ITrack = {
      ...data,
      id: randomUUID(),
      artistId: data.artistId ?? null,
      albumId: data.albumId ?? null,
    };

    this.entityById.set(track.id, track);
    return track;
  }
}
