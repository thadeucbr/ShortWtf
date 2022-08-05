import { Module } from '@nestjs/common';
import { UrlShortnerController } from './url-shortner.controller';
import { UrlShortnerService } from './url-shortner.service';

@Module({
  controllers: [UrlShortnerController],
  providers: [UrlShortnerService]
})
export class UrlShortnerModule {}
