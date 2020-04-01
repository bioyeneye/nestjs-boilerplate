import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocumentationConfig } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerDocumentationConfig.init(
    app,
    {
      title: 'boilerplate api',
      description: 'boilerplate api description',
      version: 'v1', tags: ''
    });

  await app.listen(3000);
}
bootstrap();
