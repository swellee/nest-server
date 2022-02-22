import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtStrategy } from 'src/util/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
@Module({
  imports: [JwtModule.registerAsync({
    useFactory: () => ({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' }
    })
  }),
  TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
