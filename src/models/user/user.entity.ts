import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../role/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToOne((type) => Role, (role) => role.users, { nullable: false })
  @JoinColumn({ name: 'fk_role' })
  role: Role | number;
}
