import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth, CurUser } from 'src/util/auth';
import { Role } from 'src/util/const';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return await this.userService.login(email, password)
    }

    @Post('signup')
    async signup(
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('role') role: Role,
    ) {
        return await this.userService.signup(email, password, role)
    }

    @Get()
    @Auth(Role.NORMAL)
    async getInfo(@CurUser() user: any) {
        return { ...user, status: 'active' }
    }
}
