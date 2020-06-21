import {Module, NestModule, MiddlewareConsumer, CacheModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {DatabaseModule} from './database/database.module';
import {EnvironmentConfigService} from './shared/config/environment.config';
import {AppConfigurationEnum} from './shared/config/config.enum';
import {SharedModule} from './shared/shared.module';
import {JwtStrategy} from './services/thirdparty_services/jwt.strategy';
import {contextMiddleware} from './shared/middleware/context.middelware';
import {ApplicationControllerModule} from "./controller/controller.module";

@Module({
    controllers: [AppController],
    providers: [
        AppService,
        // JwtStrategy,
    ],
    imports: [
        ConfigModule.forRoot(),
        //CacheModule.register(),
        DatabaseModule.forRoot(),
        SharedModule,
        ApplicationControllerModule.forRoot({
            flutterwave: {
                PUBLIC_KEY: "FLWPUBK_TEST-bf7b89697b6506628d22dff9875c319d-X",
                SECRET_KEY: "FLWSECK_TEST-048a0adfa70f9a464531d087f318a0cc-X"
            },
            paystack: {
                PUBLIC_KEY: "FLWPUBK_TEST-bf7b89697b6506628d22dff9875c319d-X",
                SECRET_KEY: "FLWSECK_TEST-048a0adfa70f9a464531d087f318a0cc-X"
            },
            userOptions: {
                LockoutAccessCount: 3,
                LockoutExpiryMinute: 10,
                EmailConfirmationRequired: false,
                EnableLockoutForNewUsers: true
            }
        })
    ],
})
export class AppModule implements NestModule {
    static host: string;
    static port: number | string;
    static isDev: boolean;

    constructor(private readonly _configurationService: EnvironmentConfigService) {
        AppModule.port = AppModule.normalizePort(
            _configurationService.get(AppConfigurationEnum.PORT),
        );
        AppModule.host = _configurationService.get(AppConfigurationEnum.HOST);
        AppModule.isDev = _configurationService.isDevelopment;
    }

    private static normalizePort(param: number | string): number | string {
        const portNumber: number =
            typeof param === 'string' ? parseInt(param, 10) : param;
        if (isNaN(portNumber)) return param;
        else if (portNumber >= 0) return portNumber;
    }

    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*');
    }
}
