import { Controller, HttpCode, Post } from '@nestjs/common';
import { ScrapingService } from './scraping.service';

@Controller('scraping')
export class ScrapingController {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Post('sync')
  @HttpCode(200)
  sync() {
    return this.scrapingService.sync();
  }
}
