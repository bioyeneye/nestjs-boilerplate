import { INestApplication } from "@nestjs/common";
import * as RateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

export class SecurityConfig {

    /**
     * Configures the application security against brute-force attacks, CSRF or XSRF attack, some well-known web vulnerabilities
     * @param app INestApplication
     */
    public static init(app: INestApplication) {
        app.use(helmet());
        app.use(
            new RateLimit({
                windowMs: 15 * 60 * 1000, // 15 minutes
                max: 100, // limit each IP to 100 requests per windowMs
            }),
        );
        app.use(cookieParser());
    }
}