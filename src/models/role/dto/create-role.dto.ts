import { IsPositive, IsOptional, IsNotEmpty, Matches } from 'class-validator';

export class CreateRoleDTO {
  @IsNotEmpty()
  readonly name: string;
}
