import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { UrlShortnerController } from './url-shortner.controller';
import { UrlShortnerService } from './url-shortner.service';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [UrlShortnerController],
  providers: [UrlShortnerService],
})
export class UrlShortnerModule {}
