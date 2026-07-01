import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Website } from './entity/website.entity';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { CacheService } from '../cache/redis-cache.service';
import { WEBSITE_CACHE_KEYS } from '../../config/website.cache-keys';

@Injectable()
export class WebsiteService {
    constructor(
        @InjectRepository(Website)
        private readonly websiteRepo: Repository<Website>,
        private readonly cacheService: CacheService,
    ) { }

    public async createWebsite(dto: CreateWebsiteDto): Promise<Website> {
        const existing = await this.websiteRepo.findOne({
            where: { publisherId: dto.publisherId, name: dto.name },
        });

        let saved: Website;

        if (existing) {
            const updated = this.websiteRepo.merge(existing, dto);
            saved = await this.websiteRepo.save(updated);
        } else {
            const created = this.websiteRepo.create(dto);
            saved = await this.websiteRepo.save(created);
        }

        await this.cacheService.delMany([
            WEBSITE_CACHE_KEYS.all,
            WEBSITE_CACHE_KEYS.byId(saved.id),
            WEBSITE_CACHE_KEYS.byPublisherId(saved.publisherId),
        ]);

        return saved;
    }

    public async retrieveAllWebsites(): Promise<Website[]> {
        const cached = await this.cacheService.get<Website[]>(
            WEBSITE_CACHE_KEYS.all,
        );
        if (cached) return cached;

        const websites = await this.websiteRepo.find();
        await this.cacheService.set(WEBSITE_CACHE_KEYS.all, websites);
        return websites;
    }

    public async retrieveWebsiteById(id: number): Promise<Website> {
        const cacheKey = WEBSITE_CACHE_KEYS.byId(id);
        const cached = await this.cacheService.get<Website>(cacheKey);
        if (cached) return cached;

        const website = await this.websiteRepo.findOne({ where: { id } });

        if (!website) {
            throw new NotFoundException(`Website with id ${id} not found`);
        }

        await this.cacheService.set(cacheKey, website);
        return website;
    }

    public async retrieveWebsitesByPublisherId(
        publisherId: number,
    ): Promise<Website[]> {
        const cacheKey = WEBSITE_CACHE_KEYS.byPublisherId(publisherId);
        const cached = await this.cacheService.get<Website[]>(cacheKey);
        if (cached) return cached;

        const websites = await this.websiteRepo.find({ where: { publisherId } });
        await this.cacheService.set(cacheKey, websites);
        return websites;
    }

    public async deleteWebsite(id: number): Promise<void> {
        const website = await this.websiteRepo.findOne({ where: { id } });

        const result = await this.websiteRepo.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Website with id ${id} not found`);
        }

        const keysToInvalidate = [WEBSITE_CACHE_KEYS.all, WEBSITE_CACHE_KEYS.byId(id)];
        if (website) {
            keysToInvalidate.push(
                WEBSITE_CACHE_KEYS.byPublisherId(website.publisherId),
            );
        }
        await this.cacheService.delMany(keysToInvalidate);
    }
}
