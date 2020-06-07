import {CacheModule, Global, HttpModule, Module} from '@nestjs/common';
import {EmailSenderService} from './services/emailsender.service';
import {REDIS_CACHE, RedisService} from "./services/redis.service";
import redis from 'redis';

const providers = [
    EmailSenderService,
    RedisService
];

@Global()
@Module({
    providers: [
        EmailSenderService,
        RedisService,
        {
            provide: REDIS_CACHE,
            useValue: redis
        },
    ],
    imports: [HttpModule, CacheModule.register()],
    exports: [...providers, HttpModule],
})
export class SharedModule {
}
