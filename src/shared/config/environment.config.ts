import { Injectable, INestApplication } from '@nestjs/common';

@Injectable()
export class EnvironmentConfigService {
    private environmentHosting: string = process.env.NODE_ENV || 'development';

    get(name: string): string {
        return process.env[name] || '';
    }

    get isDevelopment(): boolean {
        return this.environmentHosting === 'development';
    }
}
