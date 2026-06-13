import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from '../animal/animal.entity';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Animal])],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
