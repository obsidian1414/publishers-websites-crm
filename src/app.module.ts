import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/config';
import { DatabaseModule } from './database/database.module';
import { RedisCacheModule } from './modules/cache/redis-cache.module';
import { PublisherModule } from './modules/publisher/publisher.module';
import { WebsiteModule } from './modules/website/website.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    DatabaseModule,
    RedisCacheModule,
    PublisherModule,
    WebsiteModule,
  ],
})
export class AppModule {}
