import { Controller, Get, Param } from '@nestjs/common';
import { GuideService } from './guide.service';

@Controller('guides')
export class GuideController {
  constructor(private readonly guideService: GuideService) {}

  @Get()
  findAll() {
    return this.guideService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.guideService.findBySlug(slug);
  }
}
