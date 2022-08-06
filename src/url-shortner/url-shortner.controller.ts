import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { UrlShortnerService } from './url-shortner.service';

@Controller('url-shortner')
export class UrlShortnerController {
  constructor(private readonly urlShortnerService: UrlShortnerService) {}

  @Post()
  async create(@Body() body) {
    const { url } = body;
    const newUrl = await this.urlShortnerService.createUrl(url);
    return { newUrl: `https://short.wtf/${newUrl.shortUrl}` };
  }

  @Get(':url')
  @Redirect('https://short.wtf', 302)
  async find(@Param('url') url: string) {
    const urlToRedirect = await this.urlShortnerService.find(url);
    if (urlToRedirect) return { url: `http://${urlToRedirect}` };
  }
}
