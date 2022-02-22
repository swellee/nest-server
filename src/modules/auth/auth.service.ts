import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/util/const';
import { cryptoPassword } from 'src/util/crypto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }
    async validate(email: string, password: string) {
        const user = await this.userRepo.findOne({
            where: { email: email.toLocaleLowerCase() },
            select: ['id', 'email', 'salt', 'password', 'roles']
        })
        if (!user) {
            throw new NotFoundException('user not found')
        }
        // verify
        const encrypedPwd = cryptoPassword(password, user.salt)
        if (encrypedPwd !== user.password) {
            throw new NotFoundException('email or password not match')
        }
        delete user.password
        delete user.salt

        return user;
    }

    async sign(user: any, extra?: Record<string, string>) {
        const payload = { id: user.id, email: user.email, extra }
        return this.jwtService.sign(payload)
    }
}
