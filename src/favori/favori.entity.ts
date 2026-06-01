import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Famille } from '../famille/famille.entity';
import { Animal } from '../animal/animal.entity';

@Entity()
@Unique(['famille', 'animal'])
export class Favori {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Famille, { onDelete: 'CASCADE' })
  famille: Famille;

  @ManyToOne(() => Animal, { onDelete: 'CASCADE' })
  animal: Animal;

  @CreateDateColumn()
  created_at: Date;
}
