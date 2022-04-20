import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserProfile } from 'src/entities/user.profile.entity';
import { AuthService } from 'src/modules/auth/auth.service';
import { Role } from 'src/util/const';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        private authService: AuthService,
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(UserProfile)
        private userProfileRepo: Repository<UserProfile>,
    ) { }

    async login(email: string, password: string) {
        const user = await this.authService.validate(email, password)
        const token = await this.authService.sign(user)
        return { user, token }
    }

    async signup(email: string, password: string, role = Role.NORMAL) {
        const exist = await this.userRepo.findOne({ email: email.toLocaleLowerCase() })
        if (exist) {
            throw new BadRequestException('email already exists')
        }
        const user = new User()
        user.email = email
        user.password = this.authService.genPassword(password)
        user.roles = [role]
        await this.userRepo.save(user)

        const profile = new UserProfile()
        profile.id = user.id
        await this.userProfileRepo.save(profile)

        delete user.password
        const token = this.authService.sign(user)
        return { user, token }

    }

    async getInfo(user: User) {
        const profile = await this.userProfileRepo.findOne({ user })
        return { ...user, ...profile }
    }
}
