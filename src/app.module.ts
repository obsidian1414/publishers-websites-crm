import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/config';
import { DatabaseModule } from './database/database.module';
import { RedisCacheModule } from './cache/redis.cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    DatabaseModule,
    RedisCacheModule,
  ],
})

export class AppModule {}
