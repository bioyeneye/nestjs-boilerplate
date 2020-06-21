import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
    ExpressAdapter,
    NestExpressApplication,
} from '@nestjs/platform-express';
import { ApplicationConfiguration } from './shared/config/application.config';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import SlackHook = require("winston-slack-webhook-transport");
import * as winston from "winston";
import * as path from "path";

const logFormat = winston.format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)
const logger = winston.createLogger({
    format: winston.format.combine(
        logFormat,
        winston.format.timestamp({format: 'YYYY/MM/DD hh:mm:ss A'}),
        winston.format.label({label: path.basename(process.mainModule.filename)}),
        winston.format.metadata({fillExcept: ['message', 'level', 'timestamp', 'label']})
    ),
    level: "info",
    transports: [
        new winston.transports.File({
            filename: 'logs/combined.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                logFormat,
            )
        }),
        new SlackHook({
            mrkdwn: true,
            webhookUrl: "https://hooks.slack.com/services/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",
            formatter: info => {
                return {
                    text: `${info.level}: ${info.message}`,
                    attachments: [
                        {
                            text: logFormat
                        }
                    ],
                    blocks: [
                        {
                            type: "section",
                            text: {
                                type: "plain_text",
                                text: "You can pass more info to the formatter by supplying additional parameters in the logger call"
                            }
                        }
                    ]
                }
            }
        })
    ]
});

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter(),
        { cors: true },
    );

    //configurations
    ApplicationConfiguration.init(app);
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(process.env.PORT || '5100', () => {
        logger.info("This should now appear on Slack", {error: {message: "hello error"}});
        Logger.log(
            `Server running on http://localhost:${AppModule.port}${process.env.PORT || '5100'}`,
            'Bootsrap',
        );
    });
}

bootstrap();
