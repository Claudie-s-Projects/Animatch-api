import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Famille } from '../famille/famille.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Famille) private readonly familles: Repository<Famille>,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.familles.findOneBy({ email: dto.email });
    if (exists) throw new ConflictException('Email déjà utilisé');

    const hash = await bcrypt.hash(dto.mot_de_passe, 10);
    const famille = this.familles.create({ ...dto, mot_de_passe: hash });
    const saved = await this.familles.save(famille);

    const { mot_de_passe, ...result } = saved;
    return result;
  }
}
