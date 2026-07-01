import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PublisherService } from './publisher.service';

@Controller('publisher')
export class PublisherController {
    constructor (private readonly publisherService: PublisherService) {}

    @Get(':id')
    async getPublishers(
        @Param('id') id: string
    ) {
        return await this.publisherService.retrievePublishers(+id);
    }

    @Post()
    async postPublisher() {
        return await this.publisherService.createPublisher();
    }

    @Delete(':id')
    async deletePublisher(
        @Param('id') id: string
    ) {
        return await this.publisherService.deletePublisher(+id)
    }
}
