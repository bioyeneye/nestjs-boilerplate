import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocumentationConfig } from './config/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
    ExpressAdapter,
    NestExpressApplication,
} from '@nestjs/platform-express';

async function bootstrap() {
    //const app = await NestFactory.create(AppModule);
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter(),
        { cors: true },
    );
    
    //configurations
    //app.enableCors();
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
