import { IsOptional } from 'class-validator';

export class UpdateRoleDTO {
  @IsOptional()
  readonly name: string;
}
