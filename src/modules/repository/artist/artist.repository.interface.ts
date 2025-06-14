import { IArtist, IArtistCreate } from '../../../interfaces/artist.interface';
import { IBaseRepository } from '../base/base.repository.interface';

export interface IArtistRepository
  extends IBaseRepository<IArtist, IArtistCreate> {}
