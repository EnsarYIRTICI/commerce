import { Injectable } from '@nestjs/common';
import { readdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class DateService {
  static compareDates(firstDate: Date, seconDate: Date): boolean {
    if (!firstDate || !seconDate) {
      return true;
    }

    return new Date(firstDate).getTime() === new Date(seconDate).getTime();
  }
}
