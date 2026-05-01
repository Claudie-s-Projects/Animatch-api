import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { FindAnimalsDto } from './dto/find-animals.dto';

@Controller('animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get()
  findAll(@Query() query: FindAnimalsDto) {
    return this.animalService.findAll({
      ...query,
      page: Number(query.page) || 1,
      limit: Math.min(Number(query.limit) || 20, 100),
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const animal = await this.animalService.findOne(Number(id));
    if (!animal) throw new NotFoundException();
    return animal;
  }
}
