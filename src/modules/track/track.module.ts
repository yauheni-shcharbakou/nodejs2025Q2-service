import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { TRACK_REPOSITORY } from '../repository/track/track.repository.constants';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [RepositoryModule.forFeature(TRACK_REPOSITORY)],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
