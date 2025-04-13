import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductServiceModule } from './product-service.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432, // Or 5433 if using Docker
      username: 'postgres',
      password: 'root',
      database: 'postgres',
      entities: ['src/**/*.entity.{ts,js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductServiceModule
  ]
})
export class AppModule {}
