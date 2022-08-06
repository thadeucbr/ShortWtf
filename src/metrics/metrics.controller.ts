import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}
  @Get('/new-page-acess')
  @HttpCode(HttpStatus.NO_CONTENT)
  newPageAcess() {
    this.metricsService.newPageAcess();
  }
}
