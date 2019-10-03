import { Injectable } from '@nestjs/common';
import { Role } from '../../../models/role/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CreateRoleDTO } from '../../../models/role/dto/create-role.dto';
import { UpdateRoleDTO } from '../../../models/role/dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) { }

  async findOne(id: number): Promise<Role> {
    return await this.roleRepository.findOne(id);
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async create(role: CreateRoleDTO): Promise<Role> {
    return await this.roleRepository.save(role);
  }

  async update(id: number, role: UpdateRoleDTO): Promise<UpdateResult> {
    return await this.roleRepository.update(id, role);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.roleRepository.delete(id);
  }
}
