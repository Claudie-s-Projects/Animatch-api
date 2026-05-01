import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './animal.entity';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  providers: [AnimalService],
  controllers: [AnimalController],
  exports: [TypeOrmModule],
})
export class AnimalModule {}
