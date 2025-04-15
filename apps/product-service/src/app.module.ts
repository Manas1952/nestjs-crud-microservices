import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductServiceModule } from './product-service.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-server',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'productdb',
      entities: ['src/**/*.entity.{ts,js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductServiceModule
  ]
})
export class AppModule {}
