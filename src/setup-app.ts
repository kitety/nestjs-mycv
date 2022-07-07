import { ValidationPipe } from '@nestjs/common';

export const setupApp = (app: any) => {
  app.useGlobalPipes(
    new ValidationPipe({
      // 可以将多余的字段给去除掉
      whitelist: true,
    }),
  );
};
