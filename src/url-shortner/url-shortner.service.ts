import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';

@Injectable()
export class UrlShortnerService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
  ) {}

  async find(shortUrl: string) {
    const url = await this.urlRepository.findOne({ where: { shortUrl } });
    return url;
  }

  async createUrl(originalUrl: string) {
    if (!originalUrl) return { shortUrl: '' };

    const urlWithouHttp = originalUrl
      .replace(/https:\/\/|http:\/\//, '')
      .replace(/^www\./, '');

    const urlExists = this.find(urlWithouHttp);

    if (urlExists) return urlExists;

    try {
      const newHash = crypto.randomUUID().substring(6);

      const urlToSave = this.urlRepository.create({
        shortUrl: newHash,
        originalUrl,
      });

      await this.urlRepository.save(urlToSave);

      return urlToSave;
    } catch (error) {
      const newUrl = await this.createUrl(urlWithouHttp);
      return newUrl;
    }
  }
}
