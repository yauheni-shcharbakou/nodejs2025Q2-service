import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { USER_REPOSITORY } from '../repository/user/user.repository.constants';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [RepositoryModule.forFeature(USER_REPOSITORY)],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
