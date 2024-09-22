import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Cafe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ length: 18 })
  phoneNumber: string;

  @Column()
  ownerId: number;

  @Column()
  managerId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'managerId' })
  manager: User;
}
