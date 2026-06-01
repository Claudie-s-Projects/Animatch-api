import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SelectQueryBuilder, Repository } from 'typeorm';
import { Animal } from './animal.entity';
import { FindAnimalsDto } from './dto/find-animals.dto';

type Urgence = 'prioritaire' | 'urgent' | 'critique' | null;

const MS_PER_DAY = 86_400_000;

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal) private readonly animals: Repository<Animal>,
  ) {}

  async findAll(dto: FindAnimalsDto) {
    const { page = 1, limit = 20, espece, sexe, ville, urgence } = dto;

    const qb = this.animals
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.refuge', 'refuge')
      .where('a.disponible = true');

    if (espece) qb.andWhere('a.espece = :espece', { espece });
    if (sexe) qb.andWhere('a.sexe = :sexe', { sexe });
    if (ville) qb.andWhere('refuge.ville ILIKE :ville', { ville: `%${ville}%` });
    if (urgence) this.applyUrgenceFilter(qb, urgence);

    const [items, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: items.map((a) => ({ ...a, urgence: this.computeUrgence(a) })),
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const animal = await this.animals.findOne({
      where: { id },
      relations: ['refuge'],
    });
    if (!animal) return null;
    return { ...animal, urgence: this.computeUrgence(animal) };
  }

  private applyUrgenceFilter(qb: SelectQueryBuilder<Animal>, urgence: Urgence) {
    const now = Date.now();
    const d30 = new Date(now - 30 * MS_PER_DAY);
    const d60 = new Date(now - 60 * MS_PER_DAY);
    const d90 = new Date(now - 90 * MS_PER_DAY);

    if (urgence === 'prioritaire') {
      qb.andWhere('a.date_entree < :d30 AND a.date_entree >= :d60', { d30, d60 });
    } else if (urgence === 'urgent') {
      qb.andWhere('a.date_entree < :d60 AND a.date_entree >= :d90', { d60, d90 });
    } else if (urgence === 'critique') {
      qb.andWhere('a.date_entree < :d90', { d90 });
    }
  }

  private computeUrgence(animal: Animal): Urgence {
    if (!animal.date_entree) return null;
    const days = (Date.now() - new Date(animal.date_entree).getTime()) / MS_PER_DAY;
    if (days > 90) return 'critique';
    if (days > 60) return 'urgent';
    if (days > 30) return 'prioritaire';
    return null;
  }
}
