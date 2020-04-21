import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocumentationConfig } from './config/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    //configurations
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    SwaggerDocumentationConfig.init(app);

    await app.listen(AppModule.port, () => {
        Logger.log(
            `Server running on http://localhost:${AppModule.port}`,
            'Bootsrap',
        );
    });
}

bootstrap();
