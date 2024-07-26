import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORM } from './config/typeORM';
import { LoginModule } from './login/login.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORM()),UsersModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
