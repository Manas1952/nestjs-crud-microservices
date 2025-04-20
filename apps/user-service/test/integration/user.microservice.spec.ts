import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import { Transport, ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { AppModule } from '../../src/app.module'; // UserService's AppModule
import { firstValueFrom } from 'rxjs';

describe('UserServiceController (Integration - TCP)', () => {
  let app: INestMicroservice;
  let client: ClientProxy;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestMicroservice({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 4001 }, // ⚡ Different port (User Service)
    });

    await app.listen();

    client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 4001 },
    });
  });

  afterAll(async () => {
    await app.close();
    await client.close();
  });

  it('GET → should return list of users', async () => {
    const result = await firstValueFrom(client.send({ cmd: 'GET' }, {}));
    expect(Array.isArray(result)).toBe(true);
  });

  it('POST → should create a user', async () => {
    const payload = { name: 'Test User', email: 'testuser@example.com' };
    const result = await firstValueFrom(client.send({ cmd: 'POST' }, payload));

    expect(result).toMatchObject({
      id: expect.any(Number),
      name: 'Test User',
      email: 'testuser@example.com',
    });
  });

  it('PUT → should update user', async () => {
    const update = { id: 3, user: { name: 'Updated Name'} };
    const result = await firstValueFrom(client.send({ cmd: 'PUT' }, update));

    expect(result).toHaveProperty('affected', 1);
  });

  it('DELETE → should remove user', async () => {
    const response = await firstValueFrom(client.send({ cmd: 'DELETE' }, { id: 1 }));

    expect(response).toHaveProperty('affected');
  });
});
