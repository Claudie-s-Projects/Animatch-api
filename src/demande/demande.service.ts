import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demande } from './demande.entity';

@Injectable()
export class DemandeService {
  constructor(
    @InjectRepository(Demande) private readonly demandes: Repository<Demande>,
  ) {}

  async create(familleId: number, animalId: number, message?: string) {
    const exists = await this.demandes.findOne({
      where: { famille: { id: familleId }, animal: { id: animalId } },
    });
    if (exists) throw new ConflictException('Demande déjà envoyée pour cet animal');

    return this.demandes.save({
      famille: { id: familleId },
      animal: { id: animalId },
      message,
    });
  }

  findByFamille(familleId: number) {
    return this.demandes.find({
      where: { famille: { id: familleId } },
      relations: ['animal', 'animal.refuge'],
      order: { created_at: 'DESC' },
    });
  }

  async remove(familleId: number, animalId: number) {
    const demande = await this.demandes.findOne({
      where: { famille: { id: familleId }, animal: { id: animalId } },
    });
    if (!demande) return;
    return this.demandes.remove(demande);
  }

   findByRefuge(refugeId: number) {
    return this.demandes.find({
      where: { animal: { refuge: { id: refugeId } } },
      relations: ['animal', 'famille'],
      order: { created_at: 'ASC' },
    });
  }
async updateStatut(id: number, statut: string) {
    const demande = await this.demandes.findOneBy({ id });
    if (!demande) throw new NotFoundException();
    demande.statut = statut;
    return this.demandes.save(demande);
  }


}
