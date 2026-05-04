import { SimpleComparator } from './types';

// Компаратор для регулярных выражений
export class RegExpComparator implements SimpleComparator<RegExp> {
  canHandle(value: unknown): value is RegExp {
    return value instanceof RegExp;
  }

  compare(a: RegExp, b: RegExp): boolean {
    if (!(b instanceof RegExp)) return false;
    return a.source === b.source && a.flags === b.flags;
  }
}