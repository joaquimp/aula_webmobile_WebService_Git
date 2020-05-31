import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService
    ){ }

    @Post()
    public async post(@Body() newUser: User) {
        return await this.userService.create(newUser);
    }

}