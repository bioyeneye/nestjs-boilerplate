import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AppConfigService } from './config/app.config';
import { AppConfiguration } from './config/config.enum';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [ConfigModule.forRoot(), DatabaseModule.forRoot()],
})
export class AppModule {
    static host: string;
    static port: number | string;
    static isDev: boolean;

    constructor(private readonly _configurationService: AppConfigService) {
        AppModule.port = AppModule.normalizePort(
            _configurationService.get(AppConfiguration.PORT),
        );
        AppModule.host = _configurationService.get(AppConfiguration.HOST);
        AppModule.isDev = _configurationService.isDevelopment;
    }

    private static normalizePort(param: number | string): number | string {
        const portNumber: number =
            typeof param === 'string' ? parseInt(param, 10) : param;
        if (isNaN(portNumber)) return param;
        else if (portNumber >= 0) return portNumber;
    }
}
