import { Body, Controller, Delete, Get,Patch, Param, ParseIntPipe, Post, Req, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DemandeService } from './demande.service';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { JwtRefugeGuard } from '../auth/guards/jwt-refuge.guard';
import { UpdateStatutDto } from './dto/update-statut.dto';

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

   @Get('refuge')
  @UseGuards(JwtRefugeGuard)
  findByRefuge(@Req() req: { user: { id: number } }) {
    return this.demandeService.findByRefuge(req.user.id);
  }

   @Patch(':id/statut')
  @UseGuards(JwtRefugeGuard)
  updateStatut(@Param('id', ParseIntPipe) id: number, @Body() dto:
  UpdateStatutDto) {
    return this.demandeService.updateStatut(id, dto.statut);
  }
}
