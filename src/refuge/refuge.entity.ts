import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Animal } from '../animal/animal.entity';

@Entity()
export class Refuge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ nullable: true })
  ville: string;

  @Column({ nullable: true })
  site_url: string;

  @Column({ nullable: true })
  telephone: string;

  @OneToMany(() => Animal, (animal) => animal.refuge)
  animaux: Animal[];
}
