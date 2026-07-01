import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';

@Controller('publisher')
export class PublisherController {
    constructor (private readonly publisherService: PublisherService) {}

    @Post()
    async postPublisher(
        @Body() createPublisher: CreatePublisherDto
    ) {
        return await this.publisherService.createPublisher(createPublisher);
    }
    
    @Get()
    async getPublishers() {
        return await this.publisherService.retrieveAllPublishers();
    }

    @Get(':id')
    async getPublisherById(
        @Param('id') id: string
    ) {
        return await this.publisherService.retrievePublisherById(+id);
    }

    @Delete(':id')
    async deletePublisher(
        @Param('id') id: string
    ) {
        return await this.publisherService.deletePublisher(+id)
    }
}
