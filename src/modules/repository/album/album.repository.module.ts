import { Module } from '@nestjs/common';
import { AlbumInMemoryRepository } from './album.in-memory.repository';
import { ALBUM_REPOSITORY } from './album.repository.constants';

@Module({
  providers: [
    {
      provide: ALBUM_REPOSITORY,
      useClass: AlbumInMemoryRepository,
    },
  ],
  exports: [ALBUM_REPOSITORY],
})
export class AlbumRepositoryModule {}
