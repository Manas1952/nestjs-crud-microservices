import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserServiceController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/1 (GET)', async () => {
      const response = await request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect('Content-Type', /json/);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: 'Wireless Mouse1',
          email: 'asdffdt',
        }),
      );
  });
});
