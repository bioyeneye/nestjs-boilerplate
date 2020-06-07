import {Inject, Injectable, Logger} from "@nestjs/common";
import redis, { RedisClient } from 'redis';
import {promisify} from "util";

export const REDIS_CACHE = 'REDIS_CACHE';

@Injectable()
export class RedisService {

    constructor(@Inject(REDIS_CACHE) private client: RedisClient) {
        this.initRedis();
    }

    private initRedis() {
        this.client = redis.createClient();

        this.client.on('error', _ => {
            Logger.error("Error: RedisService");
        });

        this.client.on('ready', _ => {
            console.log("");
        });

        this.client.on('reconnecting', _ => {
            console.log("");
        });
    }

    public set(key: string, value: any, expire?: number) {
        return this.client.set(key, JSON.stringify(value));
    }

    public async get(key: string) {
        const getAsync = promisify(this.client.get).bind(this.client);
        return getAsync(key).then((res: string) => JSON.parse(res));
    }

    public remove(key: string) {
        const getAsync = promisify(this.client.del).bind(this.client);
        return getAsync(key);
    }
}