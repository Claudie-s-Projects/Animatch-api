import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import databaseConfig from './config/database.config';
import { RefugeModule } from './refuge/refuge.module';
import { AnimalModule } from './animal/animal.module';
import { ScrapingModule } from './scraping/scraping.module';
import { GuideModule } from './guide/guide.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get<TypeOrmModuleOptions>('database')!,
    }),
    ScheduleModule.forRoot(),
    RefugeModule,
    AnimalModule,
    ScrapingModule,
    GuideModule,
  ],
})
export class AppModule {}
