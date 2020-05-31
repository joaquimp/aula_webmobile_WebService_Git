import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) 
    {}

    public async create(newUser: User): Promise<User> {
        return await this.userRepository.save(newUser);
    }

    public async findOne(username: String): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: {
                name: username
            }
        });
    }
}
