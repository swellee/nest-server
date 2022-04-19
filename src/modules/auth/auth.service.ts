import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, hashSync } from 'bcrypt';
import { User } from 'src/entities/user.entity';
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
            select: ['id', 'email', 'password', 'roles']
        })
        if (!user) {
            throw new NotFoundException('user not found')
        }
        // verify
        if (!compareSync(user.password, hashSync(password, 10))) {
            throw new NotFoundException('email or password not match')
        }
        delete user.password

        return user;
    }

    sign(user: any, extra?: Record<string, string>) {
        const payload = { id: user.id, email: user.email, extra }
        return this.jwtService.sign(payload)
    }
}
