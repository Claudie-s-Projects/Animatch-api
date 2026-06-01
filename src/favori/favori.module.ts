import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favori } from './favori.entity';
import { FavoriService } from './favori.service';
import { FavoriController } from './favori.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Favori])],
  providers: [FavoriService],
  controllers: [FavoriController],
})
export class FavoriModule {}
