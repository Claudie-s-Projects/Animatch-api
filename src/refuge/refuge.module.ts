import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refuge } from './refuge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Refuge])],
  exports: [TypeOrmModule],
})
export class RefugeModule {}
