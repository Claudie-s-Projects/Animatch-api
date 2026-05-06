import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guide } from './guide.entity';

@Injectable()
export class GuideService {
  constructor(
    @InjectRepository(Guide) private readonly guides: Repository<Guide>,
  ) {}

  findAll() {
    return this.guides.find({ order: { thematique: 'ASC', titre: 'ASC' } });
  }

  async findBySlug(slug: string) {
    const guide = await this.guides.findOneBy({ slug });
    if (!guide) throw new NotFoundException();
    return guide;
  }
}
