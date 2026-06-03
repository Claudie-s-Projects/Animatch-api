import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('scraping')
export class ScrapingController {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Post('sync')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
// j'ai utilisé le gard pour empêcher l'abus de scrapping manuel (j'ai suivi l'ennoncé qui me conseillait de réutiliser la méthode déjà présente dans mon code mais celà signifie que les utilisateurs enregistrés pourront lancer un scrapping manuel, pas la solution la plus optimale)

  sync() {
    return this.scrapingService.sync();
  }
}
