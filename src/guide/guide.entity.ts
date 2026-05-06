import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Guide {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  contenu: string;

  @Column({ nullable: true })
  espece: string;

  @Column()
  thematique: string;
}
