import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    private readonly logger = new Logger(CacheService.name);

    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) { }

    async get<T>(key: string): Promise<T | undefined> {
        const value = await this.cache.get<T>(key);

        if (value !== undefined && value !== null) {
            this.logger.debug(`CACHE HIT  → ${key}`);
        } else {
            this.logger.debug(`CACHE MISS → ${key}`);
        }

        return value;
    }

    async set(key: string, value: unknown, ttl?: number): Promise<void> {
        await this.cache.set(key, value, ttl);
        this.logger.debug(`CACHE SET  → ${key}`);
    }

    async del(key: string): Promise<void> {
        await this.cache.del(key);
        this.logger.debug(`CACHE DEL  → ${key}`);
    }

    async delMany(keys: string[]): Promise<void> {
        await Promise.all(keys.map((key) => this.cache.del(key)));
        this.logger.debug(`CACHE DEL  → [${keys.join(', ')}]`);
    }
}