import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 3001
        }
      }
    ]),
    ClientsModule.register([
      {
        name: "PRODUCT_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "product-service",
          port: 3003
        }
      }
    ])
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class APIGatewayModule {}
