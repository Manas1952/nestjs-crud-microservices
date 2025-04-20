import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import { Transport, ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { AppModule } from '../../src/app.module';
import { firstValueFrom } from 'rxjs';

describe('ProductServiceController (Integration - TCP)', () => {
  let app: INestMicroservice;
  let client: ClientProxy;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestMicroservice({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 4002 }, // Different port from production
    });

    await app.listen();

    client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 4002 },
    });
  });

  afterAll(async () => {
    await app.close();
    await client.close();
  });

  it('GET → should return list of products', async () => {
    const result = await firstValueFrom(client.send({ cmd: 'GET' }, {}));
    expect(Array.isArray(result)).toBe(true);
  });

  it('POST → should create a product', async () => {
    const payload = { name: 'Test Product', stock: 15 };
    const result = await firstValueFrom(client.send({ cmd: 'POST' }, payload));

    expect(result).toMatchObject({
      id: expect.any(Number),
      name: 'Test Product',
      stock: 15,
    });
  });

  it('PUT → should update stock', async () => {
    const update = { id: 2, stock: 25 };
    const result = await firstValueFrom(client.send({ cmd: 'PUT' }, update));

    expect(result).toHaveProperty('affected', 1);
  });

  it('DELETE → should remove product', async () => {
    const response = await firstValueFrom(client.send({ cmd: 'DELETE' }, { id: 1 }));

    expect(response).toHaveProperty('affected'); // or whatever your delete response returns
  });
});
