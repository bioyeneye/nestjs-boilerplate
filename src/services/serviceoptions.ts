import {MailerOptions} from "@nestjs-modules/mailer";
import {RedisModuleOptions} from "nestjs-redis";
import {JwtModuleOptions} from "@nestjs/jwt";
import {IAuthModuleOptions} from "@nestjs/passport";

export const USEROPTIONS = "USER-OPTIONS";

export const mailOptions: MailerOptions = {
    //service: 'gmail',
    transport: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT, 10) || 465,
        secure: process.env.SMTP_SECURE || true,
        auth: {
            user: process.env.SMTP_AUTH_USER || '',
            pass: process.env.SMTP_AUTH_PASS || 'Oauthserver11@',
        },
    },
    defaults: {
        from: '"nest-boilerplate "<email@nestjsboilerplate.com>',
    },
    template: {},
};

export const redisOptions : RedisModuleOptions | RedisModuleOptions[] = {
    name: "nestjs",
    connectionName: "nestjs",
    port: 6379,
    url: 'redis://localhost:6379',
};

export const jwtOptions: JwtModuleOptions = {
    secret: 'secretKey',
    signOptions: {expiresIn: '1h'},
};

export const passportOptions: IAuthModuleOptions = {defaultStrategy: 'jwt'};