import { LeafComparator } from './types';

// Компаратор для дат
export class DateComparator implements LeafComparator<Date> {
  canHandle(value: unknown): value is Date {
    return value instanceof Date;
  }

  compare(a: Date, b: Date): boolean {
    if (!(b instanceof Date)) return false;
    return a.getTime() === b.getTime();
  }
}