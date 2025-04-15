import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-server',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'userdb',
      entities: ['src/**/*.entity.{ts,js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
