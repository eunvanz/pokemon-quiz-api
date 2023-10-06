import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const isDev = process.env.NODE_ENV === 'development';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: isDev
        ? 'http://localhost:3000'
        : process.env.SERVICE_BASE_URL || 'https://www.pokedrops.io',
      // origin: 'http://localhost:4000',
      credentials: true,
    },
    logger: ['error', 'warn', 'log'],
  });
  await app.listen(isDev ? 4000 : process.env.PORT || 5000);
  // await app.listen(4000);
}
bootstrap();
