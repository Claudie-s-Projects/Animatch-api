import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Famille } from '../famille/famille.entity';
import { Refuge } from '../refuge/refuge.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterRefugeDto } from './dto/register-refuge.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Famille) private readonly familles: Repository<Famille>,
    @InjectRepository(Refuge) private readonly refuges: Repository<Refuge>,
    private readonly jwt: JwtService,
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

  async login(dto: LoginDto) {
    const famille = await this.familles.findOneBy({ email: dto.email });
    if (!famille) throw new UnauthorizedException();

    const ok = await bcrypt.compare(dto.mot_de_passe, famille.mot_de_passe);
    if (!ok) throw new UnauthorizedException();

    const token = this.jwt.sign({ sub: famille.id, email: famille.email, prenom: famille.prenom, role: 'famille' });
    return { access_token: token };
  }

  async getMe(id: number) {
    const famille = await this.familles.findOneBy({ id });
    if (!famille) throw new UnauthorizedException();
    const { mot_de_passe, ...result } = famille;
    return result;
  }

  async updateProfile(id: number, dto: UpdateProfileDto) {
    await this.familles.update({ id }, dto);
    return this.getMe(id);
  }

  async registerRefuge(dto: RegisterRefugeDto) {
    const exists = await this.refuges.findOneBy({ email: dto.email });
    if (exists) throw new ConflictException('Email déjà utilisé');

    const hash = await bcrypt.hash(dto.mot_de_passe, 10);
    const refuge = this.refuges.create({ ...dto, mot_de_passe: hash });
    const saved = await this.refuges.save(refuge);

    const { mot_de_passe, ...result } = saved;
    return result;
  }

  async loginRefuge(dto: LoginDto) {
    const refuge = await this.refuges.findOneBy({ email: dto.email });
    if (!refuge || !refuge.mot_de_passe) throw new UnauthorizedException();

    const ok = await bcrypt.compare(dto.mot_de_passe, refuge.mot_de_passe);
    if (!ok) throw new UnauthorizedException();

    const token = this.jwt.sign({ sub: refuge.id, email: refuge.email, nom: refuge.nom, role: 'refuge' });
    return { access_token: token };
  }

   async getMeRefuge(id: number) {
    const refuge = await this.refuges.findOneBy({ id });
    if (!refuge) throw new UnauthorizedException();
    const { mot_de_passe, ...result } = refuge;
    return result;
  }
}
