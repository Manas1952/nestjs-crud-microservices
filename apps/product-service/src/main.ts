import { NestFactory } from '@nestjs/core';
import { ProductServiceModule } from './product-service.module';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice(AppModule, {
  //     transport: Transport.TCP,
  //     options: {
  //       host: "127.0.0.1",
  //       port: 3002
  //     }
  //   });
  // await app.listen();

  const app = await NestFactory.create(AppModule);

  // TCP Listener (for Request/Reply)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3002,
    },
  });

  // RabbitMQ Listener (for Pub/Sub)

  // import rmq config file instead
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'my_queue',
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000); // optional HTTP port

}
bootstrap();
