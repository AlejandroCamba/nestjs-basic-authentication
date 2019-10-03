import { Module } from '@nestjs/common';
import { RolesService } from './roles/roles.service';
import { RolesController } from './roles/roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../models/role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule { }
