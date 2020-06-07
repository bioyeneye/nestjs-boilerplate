import {Injectable, LoggerService} from "@nestjs/common";
import SlackHook = require("winston-slack-webhook-transport");
import * as winston from "winston";
import * as path from "path";

const logFormat = winston.format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.label({label: path.basename(process.mainModule.filename)}),
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        winston.format.metadata({fillExcept: ['message', 'level', 'timestamp', 'label']})
    ),
    level: "info",
    transports: [
        new winston.transports.File({
            filename: 'logs/combined.log',
            format: winston.format.combine(
                winston.format.splat(),
                winston.format.json()
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
                            text: "Or don't pass anything. That's fine too"
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

@Injectable()
export class AppLogger implements LoggerService {

    public error(message: string, trace?: string) {
        logger.error(message);
    }

    public log(message: string) {
        logger.info(message);
    }

    public warn(message: string) {
        logger.warn(message);
    }
}