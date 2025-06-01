import { IAlbum, IAlbumCreate } from '../../../interfaces/album.interface';
import { IBaseRepository } from '../base/base.repository.interface';

export interface IAlbumRepository
  extends IBaseRepository<IAlbum, IAlbumCreate> {}
