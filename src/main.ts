import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IEnv } from './interfaces/env.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<IEnv>);
  const port = configService.get('PORT', { infer: true });
  const logger = new Logger();

  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const swagger = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .addServer(`http://localhost:${port}`)
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swagger);

  SwaggerModule.setup('doc', app, swaggerDoc, {
    yamlDocumentUrl: 'doc/api.yaml',
  });

  process.on('exit', () => app.close());
  process.on('SIGINT', () => app.close());

  await app.listen(port, () => {
    logger.log(`Server is listening on http://localhost:${port}`);
    logger.log(`Swagger is available on http://localhost:${port}/doc`);
  });
}
bootstrap();
