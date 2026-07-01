import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Website } from './entity/website.entity';
import { CreateWebsiteDto } from './dto/create-website.dto';

@Injectable()
export class WebsiteService {
    constructor(
        @InjectRepository(Website)
        private readonly websiteRepo: Repository<Website>,
    ) { }

    public async createWebsite(dto: CreateWebsiteDto): Promise<Website> {
        const existing = await this.websiteRepo.findOne({
            where: { publisherId: dto.publisherId, name: dto.name },
        });

        if (existing) {
            const updated = this.websiteRepo.merge(existing, dto);
            return this.websiteRepo.save(updated);
        }

        const created = this.websiteRepo.create(dto);
        return this.websiteRepo.save(created);
    }

    public async retrieveAllWebsites(): Promise<Website[]> {
        return this.websiteRepo.find();
    }

    public async retrieveWebsiteById(id: number): Promise<Website> {
        const website = await this.websiteRepo.findOne({ where: { id } });

        if (!website) {
            throw new NotFoundException(`Website with id ${id} not found`);
        }

        return website;
    }

    public async retrieveWebsitesByPublisherId(
        publisherId: number,
    ): Promise<Website[]> {
        return this.websiteRepo.find({ where: { publisherId } });
    }

    public async deleteWebsite(id: number): Promise<{ message: string }> {
        const result = await this.websiteRepo.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Website with id ${id} not found`);
        }

        return { message: 'Website has been deleted.' }
    }
}
