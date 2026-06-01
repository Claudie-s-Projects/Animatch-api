import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { FindAnimalsDto } from './dto/find-animals.dto';

@Controller('animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get()
  findAll(@Query() query: FindAnimalsDto) {
    return this.animalService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const animal = await this.animalService.findOne(Number(id));
    if (!animal) throw new NotFoundException();
    return animal;
  }
}
