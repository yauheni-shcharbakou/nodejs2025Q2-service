import { ITrack, ITrackCreate } from '../../../interfaces/track.interface';
import { IBaseRepository } from '../base/base.repository.interface';

export interface ITrackRepository
  extends IBaseRepository<ITrack, ITrackCreate> {}
