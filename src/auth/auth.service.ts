import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Famille } from '../famille/famille.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Famille) private readonly familles: Repository<Famille>,
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

    const token = this.jwt.sign({ sub: famille.id, email: famille.email });
    return { access_token: token };
  }
}
