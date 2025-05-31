import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppExceptionFilter } from './filters/exception.filter';
import { ConfigModule } from './modules/config/config.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule {}
