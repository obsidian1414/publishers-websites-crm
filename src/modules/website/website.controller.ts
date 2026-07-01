import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { WebsiteService } from './website.service';
import { CreateWebsiteDto } from './dto/create-website.dto';

@Controller('website')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Post()
  async postWebsite(@Body() createWebsite: CreateWebsiteDto) {
    return await this.websiteService.createWebsite(createWebsite);
  }

  @Get()
  async getAllWebsites() {
    return await this.websiteService.retrieveAllWebsites();
  }

  @Get('publisher/:publisherId')
  async getWebsitesByPublisher(
    @Param('publisherId') publisherId: number,
  ) {
    return await this.websiteService.retrieveWebsitesByPublisherId(+publisherId);
  }

  @Get(':id')
  async getWebsiteById(@Param('id') id: number) {
    return await this.websiteService.retrieveWebsiteById(+id);
  }

  @Delete(':id')
  async deleteWebsite(@Param('id') id: number) {
    return await this.websiteService.deleteWebsite(+id);
  }
}
