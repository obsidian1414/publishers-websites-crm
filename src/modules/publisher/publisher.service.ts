import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from './entity/publisher.entity';

@Injectable()
export class PublisherService {
    constructor(
        @InjectRepository(Publisher)
        private readonly publisherRepo: Repository<Publisher>
    ) {}

    public async createPublisher() {
        throw new Error('Method not implemented.');
    }
    
    public async retrievePublishers(publisherId?: number) {
        throw new Error('Method not implemented.');
    }
    
    public async deletePublisher(publisherId?: number) {
        throw new Error('Method not implemented.');
    }
}
