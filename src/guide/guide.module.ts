import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guide } from './guide.entity';
import { GuideService } from './guide.service';
import { GuideController } from './guide.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Guide])],
  controllers: [GuideController],
  providers: [GuideService],
})
export class GuideModule {}
