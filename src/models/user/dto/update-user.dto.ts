import { IsNotEmpty, IsPositive, IsOptional, Matches } from 'class-validator';
import { Role } from '../../../models/role/role.entity';

export class UpdateUserDTO {
  @IsOptional()
  readonly username: string;

  @IsOptional()
  readonly password: string;

  readonly role: Role;
}
