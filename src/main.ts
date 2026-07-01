import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { runMigrations } from './common/scripts/migration.runner';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await runMigrations()
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
