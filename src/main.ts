import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocumentationConfig } from './config/swagger';
import { Logger } from '@nestjs/common';

const port = process.env.Port || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //configurations
  SwaggerDocumentationConfig.init(app);

  await app.listen(port);

  Logger.log(`Server running on http://localhost:${port}`, 'Bootsrap');
}
bootstrap();
