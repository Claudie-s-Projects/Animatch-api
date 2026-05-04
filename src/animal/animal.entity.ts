import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Refuge } from '../refuge/refuge.entity';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ nullable: true })
  espece: string;

  @Column({ nullable: true })
  race: string;

  @Column({ nullable: true })
  age: string;

  @Column({ nullable: true })
  sexe: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  photo_url: string;

  @Column({ type: 'date', nullable: true })
  date_entree: Date;

  @Column({ default: true })
  disponible: boolean;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  source_url: string;

  @ManyToOne(() => Refuge, (refuge) => refuge.animaux, { nullable: true })
  refuge: Refuge;
}
