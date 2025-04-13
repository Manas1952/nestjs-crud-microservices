import { Module } from '@nestjs/common';
import { ProductServiceController } from './product-service.controller';
import { ProductServiceService } from './product-service.service';
import { Product } from './product-service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@nestjs/microservices';
import { rabbitMQConfig } from 'rabbitmq.options';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'RMQ_CLIENT',
        ...rabbitMQConfig()
      },
    ]),

  ],
  controllers: [ProductServiceController],
  providers: [ProductServiceService],
})

export class ProductServiceModule {}
