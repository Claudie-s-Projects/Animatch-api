import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MatchService } from './match.service';

@Controller('match')
@UseGuards(AuthGuard('jwt'))
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  match(@Body() body: {
    logement: string;
    enfants: string;
    animaux: string;
    activite: string;
    experience: string;
    espece: string;
  }) {
    return this.matchService.match(body);
  }
}
