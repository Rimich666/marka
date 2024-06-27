import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsMiddleware } from './helpers/cors.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(corsMiddleware);
  await app.listen(3000);
}
bootstrap();
