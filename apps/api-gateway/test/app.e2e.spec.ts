import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('API Gateway (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  
  it('GET /api → should return Hello World!', async () => {
    const res = await request(app.getHttpServer())
    .get('/api')
    .expect(200);
    
    expect(res.text).toEqual('Hello World!');
  });
  
  it('POST /api/products → should create a user', async () => {
    const payload = { name: 'E2E User', stock: 150 };
    
    const res = await request(app.getHttpServer())
    .post('/api/products')
    .send(payload)
    .expect(200);
    
    expect(res.body.response).toMatchObject({
      id: expect.any(Number),
      name: 'E2E User',
      stock: 150,
    });
  });
  
  it('GET /api/products → should return product list', async () => {
    const res = await request(app.getHttpServer())
    .get('/api/products')
    .expect(200);
    
    expect(Array.isArray(res.body.response)).toBe(true);
  });
  
  it('PUT /api/products/:id/:stock → should update a product', async () => {
    const id = 3;
    const stock = 100;
    
    const res = await request(app.getHttpServer())
    .put(`/api/products/${id}/${stock}`)
    .expect(200);
    
    expect(res.body.response).toHaveProperty('affected', 1);
  });

  it('DELETE /api/products/:id → should delete a product', async () => {
    const id = 1;
    
    const res = await request(app.getHttpServer())
    .delete(`/api/products/${id}`)
    .expect(200);
    
    expect(res.body.response).toHaveProperty('affected');
  });


  it('POST /api/users → should create a user', async () => {
    const payload = { name: 'Test User', email: 'testuser@example.com' };

    const res = await request(app.getHttpServer())
      .post('/api/users')
      .send(payload)
      .expect(200);

    expect(res.body.response).toMatchObject({
      id: expect.any(Number),
      name: 'Test User',
      email: 'testuser@example.com',
    });
  });

  it('GET /api/users → should return list of users', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/users')
      .expect(200);

    expect(Array.isArray(res.body.response)).toBe(true);
  });

  it('PUT /api/users/:id → should update a user', async () => {
    const payload = { name: 'Updated Name' };
    const id = 3; // Assuming ID 1 exists for testing

    const res = await request(app.getHttpServer())
      .put(`/api/users/${id}`)
      .send(payload)
      .expect(200);

    expect(res.body.response).toHaveProperty('affected', 1);
  });

  it('DELETE /api/users/:id → should delete a user', async () => {
    const id = 1; // Assuming ID 1 exists for testing

    const res = await request(app.getHttpServer())
      .delete(`/api/users/${id}`)
      .expect(200);

    expect(res.body.response).toHaveProperty('affected');
  });
});
