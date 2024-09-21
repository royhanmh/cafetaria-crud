import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../user-role.enum';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  fullname: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.manager,
  })
  role: UserRole;
}
