import { Module } from '@nestjs/common';
import { TrackInMemoryRepository } from './track.in-memory.repository';
import { TRACK_REPOSITORY } from './track.repository.constants';

@Module({
  providers: [
    {
      provide: TRACK_REPOSITORY,
      useClass: TrackInMemoryRepository,
    },
  ],
  exports: [TRACK_REPOSITORY],
})
export class TrackRepositoryModule {}
