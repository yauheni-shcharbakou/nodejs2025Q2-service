import { Module } from '@nestjs/common';
import { FavoritesInMemoryRepository } from './favorites.in-memory.repository';
import { FAVORITES_REPOSITORY } from './favorites.repository.constants';

@Module({
  providers: [
    {
      provide: FAVORITES_REPOSITORY,
      useClass: FavoritesInMemoryRepository,
    },
  ],
  exports: [FAVORITES_REPOSITORY],
})
export class FavoritesRepositoryModule {}
