import {
  Controller,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Get
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateResult, DeleteResult } from 'typeorm';

import { User } from '../../../models/user/user.entity';
import { UsersService } from './users.service';
import { CreateUserDTO } from '../../../models/user/dto/create-user.dto';
import { UpdateUserDTO } from '../../../models/user/dto/update-user.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  index(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':username/:password')
  findUser(
    @Param('username') username: string,
    @Param('password') password: string
  ): Promise<User> {
    return this.usersService.findUser(username);
  }

  @Post()
  async create(@Body() userData: CreateUserDTO): Promise<User> {
    return this.usersService.create(userData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: number, @Body() userData: UpdateUserDTO): Promise<UpdateResult> {
    return this.usersService.update(Number(id), userData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.usersService.delete(id);
  }
}
