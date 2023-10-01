import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const isDev = process.env.NODE_ENV === 'development';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: isDev
        ? 'http://localhost:3000'
        : process.env.SERVICE_BASE_URL || 'https://www.pokedrops.io',
      credentials: true,
    },
    logger: ['error', 'warn', 'log'],
  });
  await app.listen(isDev ? 4000 : 8080);
}
bootstrap();
