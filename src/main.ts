import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
    ExpressAdapter,
    NestExpressApplication,
} from '@nestjs/platform-express';
import { ApplicationConfiguration } from './config/application.config';
import { HttpExceptionFilter } from './shared/filter/http-exception.filter';

async function bootstrap() {
    //const app = await NestFactory.create(AppModule);
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter(),
        { cors: true },
    );

    app.set('trust proxy', 1); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    
    //configurations
    ApplicationConfiguration.init(app);
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(AppModule.port, () => {
        Logger.log(
            `Server running on http://localhost:${AppModule.port}`,
            'Bootsrap',
        );
    });
}

bootstrap();
