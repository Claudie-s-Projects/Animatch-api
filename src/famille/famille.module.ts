import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Famille } from './famille.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Famille])],
  exports: [TypeOrmModule],
})
export class FamilleModule {}
