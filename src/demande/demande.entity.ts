import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Famille } from '../famille/famille.entity';
import { Animal } from '../animal/animal.entity';

@Entity()
@Unique(['famille', 'animal'])
export class Demande {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Famille, { onDelete: 'CASCADE' })
  famille: Famille;

  @ManyToOne(() => Animal, { onDelete: 'CASCADE' })
  animal: Animal;

  @Column({ nullable: true })
  message: string;

  @Column({ default: 'en_attente' })
  statut: string;

  @CreateDateColumn()
  created_at: Date;
}
