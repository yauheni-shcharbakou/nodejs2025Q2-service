import { Module } from '@nestjs/common';
import { UserInMemoryRepository } from './user.in-memory.repository';
import { USER_REPOSITORY } from './user.repository.constants';

@Module({
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserInMemoryRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserRepositoryModule {}
