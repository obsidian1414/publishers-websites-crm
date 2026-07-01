import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Publisher } from './entity/publisher.entity';
import { CreatePublisherDto } from './dto/create-publisher.dto';

@Injectable()
export class PublisherService {
    constructor(
        @InjectRepository(Publisher)
        private readonly publisherRepo: Repository<Publisher>,
    ) { }

    public async createPublisher(dto: CreatePublisherDto): Promise<Publisher> {
        const existing = await this.publisherRepo.findOne({
            where: { name: dto.name },
        });

        if (existing) {
            const updated = this.publisherRepo.merge(existing, dto);
            return this.publisherRepo.save(updated);
        }

        const created = this.publisherRepo.create(dto);
        return this.publisherRepo.save(created);
    }

    public async retrievePublisherById(
        publisherId: number,
    ): Promise<Publisher> {
        const publisher = await this.publisherRepo.findOne({
            where: { id: publisherId },
        });

        if (!publisher) {
            throw new NotFoundException(
                `Publisher with id ${publisherId} not found`,
            );
        }

        return publisher
    }

    public async retrieveAllPublishers(): Promise<Publisher[]> {
        return this.publisherRepo.find();
    }

    public async deletePublisher(publisherId: number): Promise<{ message: string }> {
        const result = await this.publisherRepo.delete(publisherId);

        if (result.affected === 0) {
            throw new NotFoundException(
                `Publisher with id ${publisherId} not found`,
            );
        }

        return { message: 'Publisher has been deleted.' }
    }
}
