import { Module } from '@nestjs/common';
import { ArtistInMemoryRepository } from './artist.in-memory.repository';
import { ARTIST_REPOSITORY } from './artist.repository.constants';

@Module({
  providers: [
    {
      provide: ARTIST_REPOSITORY,
      useClass: ArtistInMemoryRepository,
    },
  ],
  exports: [ARTIST_REPOSITORY],
})
export class ArtistRepositoryModule {}
