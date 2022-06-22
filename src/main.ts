import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['asasas'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      // 可以将多余的字段给去除掉
      whitelist: true,
    }),
  );
  await app.listen(3000);
}

bootstrap();
