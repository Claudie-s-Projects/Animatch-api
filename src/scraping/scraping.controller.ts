import { Controller, HttpCode, Post,UseGuards } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('scraping')
export class ScrapingController {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Post('sync')
  @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
  sync() {
    return this.scrapingService.sync();
  }
}
