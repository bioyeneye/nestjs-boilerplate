import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocumentationConfig } from './config/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

const port = process.env.Port || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //configurations
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  SwaggerDocumentationConfig.init(app); 
  
  await app.listen(port);

  Logger.log(`Server running on http://localhost:${port}`, 'Bootsrap');
}
bootstrap();
