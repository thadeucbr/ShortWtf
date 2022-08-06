import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class MetricsService {
  newPageAcess() {
    let cont;

    try {
      cont = JSON.parse(fs.readFileSync('./cont.json').toString());
      cont += 1;
    } catch (err) {
      cont = 1;
    }

    fs.writeFileSync('./cont.json', JSON.stringify(cont));
  }
}
