import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { APP_PIPE } from '@nestjs/core';
import { CookieSessionModule } from 'nestjs-cookie-session';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

@Module({
  imports: [
    CookieSessionModule.forRoot({
      session: { secret: 'keyboard cat' },
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  // 程序启动，自动调用
  // 新的方法使用 cookieSession in AppModule
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(
  //       cookieSession({
  //         keys: ['sdsdsdsdsd'],
  //       }),
  //     )
  //     .forRoutes('*');
  // }
}
