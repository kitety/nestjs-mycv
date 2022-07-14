import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // setupApp(app);
    await app.init();
  });

  it('handle a signup request', () => {
    const email = 'test123@qq.com';
    // 使用随机邮箱
    // 创建之后删除
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email,
        password: 'test',
      })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });
  it('signup as a user then get the currently logged in user', async () => {
    const email = 'test123@qq.com';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email,
        password: 'test',
      })
      .expect(201);
    const cookie = res.get('Set-Cookie');
    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami2')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
