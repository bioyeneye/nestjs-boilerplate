import { INestApplication } from "@nestjs/common";
import * as compression from 'compression';
import * as morgan from 'morgan';
import { SwaggerDocumentationConfig } from './swagger.config';
import { SecurityConfig } from "./security.config";

export class ApplicationConfiguration {
    public static init(app: INestApplication) {
        app.enableCors({
            origin: true,
            credentials: true,
            maxAge: 3600,
            optionsSuccessStatus: 200,
            exposedHeaders: ['Authorization'],
          });
        //app.use('trust proxy', 1)
        app.use(compression());
        app.use(morgan('combined'));

        SecurityConfig.init(app);
        SwaggerDocumentationConfig.init(app);
    }
}