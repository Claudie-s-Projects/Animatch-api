import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Famille {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prenom: string;

  @Column()
  nom: string;

  @Column({ unique: true })
  email: string;

  @Column()
  mot_de_passe: string;

  @Column({ nullable: true })
  logement: string;

  @Column({ nullable: true })
  enfants: string;

  @Column({ nullable: true })
  animaux: string;

  @Column({ nullable: true })
  activite: string;

  @Column({ nullable: true })
  experience: string;
}
