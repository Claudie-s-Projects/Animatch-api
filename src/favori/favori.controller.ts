import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavoriService } from './favori.service';

@Controller('favorites')
@UseGuards(AuthGuard('jwt'))
export class FavoriController {
  constructor(private readonly favoriService: FavoriService) {}

  @Get()
  findAll(@Req() req: { user: { id: number } }) {
    return this.favoriService.findAll(req.user.id);
  }

  @Post()
  add(@Req() req: { user: { id: number } }, @Body('animalId', ParseIntPipe) animalId: number) {
    return this.favoriService.add(req.user.id, animalId);
  }

  @Delete(':animalId')
  remove(@Req() req: { user: { id: number } }, @Param('animalId', ParseIntPipe) animalId: number) {
    return this.favoriService.remove(req.user.id, animalId);
  }
}
