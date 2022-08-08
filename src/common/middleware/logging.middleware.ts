import { Injectable, NestMiddleware } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private getDurationInMs(start) {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
  }
  use(req: any, res: any, next: () => void) {
    const start = process.hrtime();
    let file = {
      access: 11,
      longestResponse: 0,
      shortestResponse: 100,
      avgResponse: 0,
      webAccess: 1,
    };
    try {
      res.on('finish', () => {
        const responseTime = this.getDurationInMs(start);
        file = JSON.parse(fs.readFileSync('./cont.json', 'utf-8'));
        file.access += 1;
        if (file.longestResponse < responseTime) {
          file.longestResponse = responseTime;
        }
        if (file.shortestResponse > responseTime) {
          file.shortestResponse = responseTime;
        }
        file.avgResponse = (file.longestResponse + file.shortestResponse) / 2;
        fs.writeFileSync('./cont.json', JSON.stringify(file));
      });
    } catch (err) {
      res.on('finish', () => {
        const responseTime = this.getDurationInMs(start);
        file.access = 1;
        file.longestResponse = responseTime;
        file.shortestResponse = responseTime;
        file.avgResponse = responseTime;
      });
      fs.writeFileSync('./cont.json', JSON.stringify(file));
    }
    next();
  }
}
