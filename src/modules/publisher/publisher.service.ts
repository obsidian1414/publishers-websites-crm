import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from './entity/publisher.entity';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { CacheService } from '../cache/redis-cache.service';
import { PUBLISHER_CACHE_KEYS } from '../../config/publisher.cache-keys';

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepo: Repository<Publisher>,
    private readonly cacheService: CacheService,
  ) { }

  public async createPublisher(dto: CreatePublisherDto): Promise<Publisher> {
    const existing = await this.publisherRepo.findOne({
      where: { name: dto.name },
    });

    let saved: Publisher;

    if (existing) {
      const updated = this.publisherRepo.merge(existing, dto);
      saved = await this.publisherRepo.save(updated);
    } else {
      const created = this.publisherRepo.create(dto);
      saved = await this.publisherRepo.save(created);
    }

    await this.cacheService.delMany([
      PUBLISHER_CACHE_KEYS.all,
      PUBLISHER_CACHE_KEYS.byId(saved.id),
    ]);

    return saved;
  }

  public async retrievePublisherById(publisherId: number): Promise<Publisher> {
    const cacheKey = PUBLISHER_CACHE_KEYS.byId(publisherId);
    const cached = await this.cacheService.get<Publisher>(cacheKey);
    if (cached) return cached;

    const publisher = await this.publisherRepo.findOne({
      where: { id: publisherId },
    });

    if (!publisher) {
      throw new NotFoundException(
        `Publisher with id ${publisherId} not found`,
      );
    }

    await this.cacheService.set(cacheKey, publisher);
    return publisher;
  }

  public async retrieveAllPublishers(): Promise<Publisher[]> {
    const cached = await this.cacheService.get<Publisher[]>(
      PUBLISHER_CACHE_KEYS.all,
    );
    if (cached) return cached;

    const publishers = await this.publisherRepo.find();
    await this.cacheService.set(PUBLISHER_CACHE_KEYS.all, publishers);
    return publishers;
  }

  public async deletePublisher(publisherId: number): Promise<void> {
    const result = await this.publisherRepo.delete(publisherId);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Publisher with id ${publisherId} not found`,
      );
    }

    await this.cacheService.delMany([
      PUBLISHER_CACHE_KEYS.all,
      PUBLISHER_CACHE_KEYS.byId(publisherId),
    ]);
  }
}
