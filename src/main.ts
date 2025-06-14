import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './modules/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const logger = new Logger();

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

  await app.listen(port, () => {
    logger.log(`Server is listening on http://localhost:${port}`);
    logger.log(`Swagger is available on http://localhost:${port}/doc`);
  });
}
bootstrap();
