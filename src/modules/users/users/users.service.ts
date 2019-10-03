import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult, Repository, In } from 'typeorm';

import { User } from '../../../models/user/user.entity';
import { CreateUserDTO } from '../../../models/user/dto/create-user.dto';
import { UpdateUserDTO } from '../../../models/user/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUser(username: string): Promise<User> {
    return await this.userRepository.findOne({ username }, { relations: ['role'] });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id, { relations: ['role'] });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(user: CreateUserDTO): Promise<User> {
    const bcrypt = require('bcrypt');
    const saltRounds = 15;

    return bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        this.hashGenerator(err, hash, user);
      });
    });
  }
 
  private async hashGenerator(err, hash, user: CreateUserDTO): Promise<User> {
    return await this.userRepository.save({
      username: user.username,
      password: hash,
      role: user.role
    });
  }

  async update(id: number, user: UpdateUserDTO): Promise<UpdateResult> {
    return await this.userRepository.update(id, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
