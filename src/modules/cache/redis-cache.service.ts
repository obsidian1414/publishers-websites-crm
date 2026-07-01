import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    private readonly logger = new Logger(CacheService.name);

    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) { }

    async get<T>(key: string): Promise<T | undefined> {
        const value = await this.cache.get<T>(key);
        return value;
    }

    async set(key: string, value: unknown, ttl?: number): Promise<void> {
        await this.cache.set(key, value, ttl);
    }

    async del(key: string): Promise<void> {
        await this.cache.del(key);
    }

    async delMany(keys: string[]): Promise<void> {
        await Promise.all(keys.map((key) => this.cache.del(key)));
    }
}