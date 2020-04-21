import { INestApplication } from "@nestjs/common";
import * as compression from 'compression';
import * as morgan from 'morgan';
import { SwaggerDocumentationConfig } from './swagger.config';
import { SecurityConfig } from "./security.config";

export class ApplicationConfiguration {
    public static init(app: INestApplication) {
        app.enableCors();
        app.use(compression());
        app.use(morgan('combined'));

        SecurityConfig.init(app);
        SwaggerDocumentationConfig.init(app);
    }
}