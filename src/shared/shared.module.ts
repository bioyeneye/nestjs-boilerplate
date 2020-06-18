import {CacheModule, Global, HttpModule, Module} from '@nestjs/common';
import {EmailSenderService} from './services/emailsender.service';
import {RedisService} from "./services/redis.service";
import { RedisClient } from 'redis';
import {ProviderEnum} from "../config/config.enum";
import {EnvironmentConfigService} from "../config/environment.config";

const redisProvider = {
    provide: ProviderEnum.REDIS,
    useValue: RedisClient
};

const providers = [
    EmailSenderService,
    redisProvider,
    RedisService,
    EnvironmentConfigService,
];

@Global()
@Module({
    providers: [
        ...providers
    ],
    imports: [HttpModule, CacheModule.register()],
    exports: [...providers, HttpModule],
})
export class SharedModule {
}
