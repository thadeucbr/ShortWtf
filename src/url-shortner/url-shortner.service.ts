import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';
import * as crypto from 'crypto';
import { Cache } from 'cache-manager';

@Injectable()
export class UrlShortnerService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async find(shortUrl: string) {
    const urlInCache = await this.cacheManager.get(shortUrl);
    if (urlInCache) return urlInCache;
    const url = await this.urlRepository.findOne({ where: { shortUrl } });
    await this.cacheManager.set(shortUrl, url?.originalUrl);
    return url?.originalUrl;
  }

  async createUrl(originalUrl: string, errorCount = 0) {
    if (!originalUrl) return { shortUrl: '' };

    const urlWithouHttp = originalUrl
      .replace(/https:\/\/|http:\/\//, '')
      .replace(/^www\./, '');

    const urlExists = await this.urlRepository.findOne({
      where: { originalUrl: urlWithouHttp },
    });

    if (urlExists) return urlExists;

    try {
      const newHash = crypto.randomUUID().substring(0, 6);

      const urlToSave = this.urlRepository.create({
        shortUrl: newHash,
        originalUrl: urlWithouHttp,
      });

      await this.urlRepository.save(urlToSave);

      await this.cacheManager.set(urlToSave.shortUrl, urlWithouHttp);

      return urlToSave;
    } catch (error) {
      if (errorCount < 10) {
        const newUrl = await this.createUrl(urlWithouHttp, errorCount + 1);
        return newUrl;
      }
      throw new InternalServerErrorException();
    }
  }
}
