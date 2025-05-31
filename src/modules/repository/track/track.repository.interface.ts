import {
  ITrack,
  ITrackCreate,
  ITrackUpdate,
} from '../../../interfaces/track.interface';

export interface ITrackRepository {
  findMany(): Promise<ITrack[]>;
  findById(id: string): Promise<ITrack | undefined>;
  create(data: ITrackCreate): Promise<ITrack>;
  updateById(id: string, data: ITrackUpdate): Promise<ITrack | undefined>;
  deleteById(id: string): Promise<boolean>;
}
