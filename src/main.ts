import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './modules/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(configService.get('PORT'));
}
bootstrap();
