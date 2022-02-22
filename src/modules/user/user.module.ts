import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserProfile } from 'src/entities/user.profile.entity';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      User,
      UserProfile
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
