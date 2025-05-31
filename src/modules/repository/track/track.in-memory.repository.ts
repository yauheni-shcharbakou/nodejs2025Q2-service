import { Injectable } from '@nestjs/common';
import {
  ITrack,
  ITrackCreate,
  ITrackUpdate,
} from '../../../interfaces/track.interface';
import { ITrackRepository } from './track.repository.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class TrackInMemoryRepository implements ITrackRepository {
  private trackById = new Map<string, ITrack>();

  async findMany(): Promise<ITrack[]> {
    return Array.from(this.trackById.values());
  }

  async findById(id: string): Promise<ITrack | undefined> {
    return this.trackById.get(id);
  }

  async create(data: ITrackCreate): Promise<ITrack> {
    const track: ITrack = {
      ...data,
      id: randomUUID(),
      artistId: data.artistId ?? null,
      albumId: data.albumId ?? null,
    };

    this.trackById.set(track.id, track);
    return track;
  }

  async updateById(
    id: string,
    data: ITrackUpdate,
  ): Promise<ITrack | undefined> {
    const track = this.trackById.get(id);

    if (!track) {
      return;
    }

    return Object.assign(track, data);
  }

  async deleteById(id: string): Promise<boolean> {
    if (!this.trackById.has(id)) {
      return false;
    }

    this.trackById.delete(id);
    return true;
  }
}
