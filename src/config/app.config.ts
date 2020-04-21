import { Injectable, INestApplication } from "@nestjs/common";
import * as compression from 'compression';

@Injectable()
export class AppConfigService {
    private environmentHosting: string = process.env.NODE_ENV || 'development';

    get(name: string): string {
        return process.env[name] || '';
    }

    get isDevelopment(): boolean {
        return this.environmentHosting === 'development';
    }

    public static init(app: INestApplication) {
        app.enableCors();
        app.use(compression());
    }
}