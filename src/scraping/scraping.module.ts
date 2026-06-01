import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from '../animal/animal.entity';
import { Refuge } from '../refuge/refuge.entity';
import { ScrapingService } from './scraping.service';
import { ScrapingController } from './scraping.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, Refuge])],
  providers: [ScrapingService],
  controllers: [ScrapingController],
  exports: [ScrapingService],
})
export class ScrapingModule {}
