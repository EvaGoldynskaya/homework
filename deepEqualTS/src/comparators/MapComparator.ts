import { RecursiveComparator, ComparisonContext } from './types';

//
export class MapComparator implements RecursiveComparator<Map<unknown, unknown>> {
  canHandle(value: unknown): value is Map<unknown, unknown> {
    return value instanceof Map;
  }

  compare(a: Map<unknown, unknown>, b: Map<unknown, unknown>, context: ComparisonContext, depth: number): boolean {
    
    ////Проверка на тип и размер
    if (!(b instanceof Map)) return false;
    if (a.size !== b.size) return false;
    
    for (const [key, value] of a) {
      if (!b.has(key)) return false;
      if (!context.deepEqual(value, b.get(key), context, depth + 1)) {
        return false;
      }
    }
    return true;
  }
}