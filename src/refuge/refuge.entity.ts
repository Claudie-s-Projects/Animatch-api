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

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  mot_de_passe: string;

  @Column({ nullable: true })
  adresse: string;

  @Column({ nullable: true })
  localite: string;

  @OneToMany(() => Animal, (animal) => animal.refuge)
  animaux: Animal[];
}
