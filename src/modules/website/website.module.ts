import { Module } from '@nestjs/common';
import { WebsiteController } from './website.controller';
import { WebsiteService } from './website.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Website } from './entity/website.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Website])],
  controllers: [WebsiteController],
  providers: [WebsiteService]
})
export class WebsiteModule {}
