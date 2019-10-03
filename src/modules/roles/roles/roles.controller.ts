import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from '../../../models/role/role.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CreateRoleDTO } from '../../../models/role/dto/create-role.dto';
import { UpdateRoleDTO } from '../../../models/role/dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) { }

  @Get()
  index(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Post()
  async create(@Body() roleData: CreateRoleDTO): Promise<Role> {
    return this.rolesService.create(roleData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() roleData: UpdateRoleDTO): Promise<UpdateResult> {
    return this.rolesService.update(id, roleData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.rolesService.delete(id);
  }
}
