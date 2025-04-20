import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test'
        ? join(process.cwd(), 'apps', 'api-gateway', '.env.test')
        : join(process.cwd(), 'apps', 'api-gateway', '.env'),
    }),
    ClientsModule.registerAsync([
      {
        name: "USER_SERVICE",
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              host: configService.get<string>('USER_SERVICE_HOST'),
              port: parseInt(configService.get<string>('USER_SERVICE_PORT')!, 10),
            },
          };
        },
      },
      {
        name: "PRODUCT_SERVICE",
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              host: configService.get<string>('PRODUCT_SERVICE_HOST'),
              port: parseInt(configService.get<string>('PRODUCT_SERVICE_PORT')!, 10),
            },
          };
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class APIGatewayModule {}
