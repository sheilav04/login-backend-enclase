import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORM = (): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Bootcamp052024',
    database: 'data_users',
    entities: ['dist/**/*.entity.{ts,js}'],
    synchronize: true,
  };
};