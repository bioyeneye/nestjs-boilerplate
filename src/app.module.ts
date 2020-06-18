import {Module, NestModule, MiddlewareConsumer, CacheModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {DatabaseModule} from './database/database.module';
import {EnvironmentConfigService} from './config/environment.config';
import {AppConfigurationEnum} from './config/config.enum';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './modules/auth/auth.module';
import {UserModule} from './modules/user/user.module';
import {JwtStrategy} from './modules/auth/jwt.strategy';
import {contextMiddleware} from './shared/middleware/context.middelware';
import {MailerModule} from '@nestjs-modules/mailer';
import {RedisModule} from "nestjs-redis";
import {ServicesModule} from "./services/services.module";

@Module({
    controllers: [AppController],
    providers: [
        AppService,
        JwtStrategy,
    ],
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule.forRoot(),
        SharedModule,
        AuthModule,
        ServicesModule.forRoot({
            flutterwave: {PUBLIC_KEY: "FLWPUBK_TEST-bf7b89697b6506628d22dff9875c319d-X", SECRET_KEY: "FLWSECK_TEST-048a0adfa70f9a464531d087f318a0cc-X"},
            paystack: {PUBLIC_KEY: "", SECRET_KEY: ""}
        }),
        UserModule.forRoot({
            LockoutAccessCount: 3,
            LockoutExpiryMinute: 10,
            EmailConfirmationRequired: false,
            EnableLockoutForNewUsers: true
        }),
        MailerModule.forRootAsync({
            useFactory: () => ({
                service: 'gmail',
                transport: {
                    host: process.env.SMTP_HOST || 'smtp.gmail.com',
                    port: parseInt(process.env.SMTP_PORT, 10) || 465,
                    secure: process.env.SMTP_SECURE || true,
                    //ignoreTLS: true, //process.env.SMTP_SECURE !== 'false',
                    auth: {
                        user: process.env.SMTP_AUTH_USER || '',
                        pass: process.env.SMTP_AUTH_PASS || 'Oauthserver11@',
                    },
                },
                defaults: {
                    from: '"nest-boilerplate "<email@nestjsboilerplate.com>',
                },
                template: {},
            }),
        }),
        RedisModule.register({
            name: "nestjs",
            connectionName: "nestjs",
            port: 6379,
            url: 'redis://localhost:6379',
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
