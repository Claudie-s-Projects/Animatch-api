import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DemandeService } from './demande.service';
import { CreateDemandeDto } from './dto/create-demande.dto';

@Controller('demandes')
@UseGuards(AuthGuard('jwt'))
export class DemandeController {
  constructor(private readonly demandeService: DemandeService) {}

  @Get()
  findAll(@Req() req: { user: { id: number } }) {
    return this.demandeService.findByFamille(req.user.id);
  }

  @Post()
  create(@Req() req: { user: { id: number } }, @Body() dto: CreateDemandeDto) {
    return this.demandeService.create(req.user.id, dto.animalId, dto.message);
  }

  @Delete(':animalId')
  remove(@Req() req: { user: { id: number } }, @Param('animalId', ParseIntPipe) animalId: number) {
    return this.demandeService.remove(req.user.id, animalId);
  }
}
