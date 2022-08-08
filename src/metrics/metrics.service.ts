import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class MetricsService {
  newPageAcess() {
    let file = {
      access: 1,
      longestResponse: 0,
      shortestResponse: 200,
      avgResponse: 0,
      webAccess: 1,
    };
    try {
      file = JSON.parse(fs.readFileSync('./cont.json', 'utf-8'));
      file.webAccess += 1;
      fs.writeFileSync('./cont.json', JSON.stringify(file));
    } catch (err) {
      file.webAccess = 1;
      fs.writeFileSync('./cont.json', JSON.stringify(file));
    }
  }
}
