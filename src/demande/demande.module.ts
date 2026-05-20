import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demande } from './demande.entity';
import { DemandeController } from './demande.controller';
import { DemandeService } from './demande.service';

@Module({
  imports: [TypeOrmModule.forFeature([Demande])],
  controllers: [DemandeController],
  providers: [DemandeService],
})
export class DemandeModule {}
