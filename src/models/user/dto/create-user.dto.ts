
import { IsPositive, IsOptional, IsNotEmpty, Matches } from 'class-validator';
import { Role } from '../../../models/role/role.entity';

export class CreateUserDTO {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;

  @IsPositive()
  readonly role: Role;
}
