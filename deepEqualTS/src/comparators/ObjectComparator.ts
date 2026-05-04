import { RecursiveComparator, ComparisonContext } from './types';

//
export class ObjectComparator implements RecursiveComparator<Record<string, any>> {
  canHandle(value: unknown): value is Record<string, any> {
    return typeof value === 'object' && !Array.isArray(value);
  }

  compare(a: Record<string, any>, b: Record<string, any>, context: ComparisonContext, depth: number): boolean {
    
    //Проверка на тип и размер
    if (typeof b !== 'object' || b === null) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    
    return keysA.every(key => 
      keysB.includes(key) && 
      context.deepEqual(a[key], b[key], context, depth + 1)
    );
  }
}