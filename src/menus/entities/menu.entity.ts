import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cafe } from 'src/cafes/entities/cafe.entity';
@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'float', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'boolean', default: false })
  isRecommendation: boolean;

  @Column()
  cafeId: number;

  @ManyToOne(() => Cafe, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cafeId' })
  cafe: Cafe;
}
