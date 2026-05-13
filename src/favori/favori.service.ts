import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favori } from './favori.entity';

@Injectable()
export class FavoriService {
  constructor(
    @InjectRepository(Favori) private readonly favoris: Repository<Favori>,
  ) {}

  async add(familleId: number, animalId: number) {
    const exists = await this.favoris.findOne({
      where: { famille: { id: familleId }, animal: { id: animalId } },
    });
    if (exists) return exists;
    return this.favoris.save({ famille: { id: familleId }, animal: { id: animalId } });
  }

  async remove(familleId: number, animalId: number) {
    await this.favoris.delete({ famille: { id: familleId }, animal: { id: animalId } });
  }

  findAll(familleId: number) {
    return this.favoris.find({
      where: { famille: { id: familleId } },
      relations: ['animal', 'animal.refuge'],
    });
  }
}
