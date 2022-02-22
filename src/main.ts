import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
require('dotenv').config();
console.log('jwtm',process.env.JWT_SECRET)

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/{*.entity,*.view}{.ts,.js}'],
      logging: process.env.DB_LOGGING.toLowerCase() === 'true',
      synchronize:
        process.env.DB_SYNCHRONIZE.toLowerCase() === 'true',
    }),
    UserModule,
    AuthModule,
  ],
})
class AppModule { }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000
  await app.listen(port);
  Logger.log(`server runing at http://localhost:${port}`)
}
bootstrap();
