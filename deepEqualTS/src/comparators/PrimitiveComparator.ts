import { LeafComparator, Primitive } from './types';

//
export class PrimitiveComparator implements LeafComparator<Primitive> {
  canHandle(value: unknown): value is Primitive {
    if (value === null || value === undefined) return true;
    const type = typeof value;
    if (['string', 'number', 'boolean'].includes(type)) return true;
    return false

  }

  compare(a: Primitive, b: Primitive): boolean {
    return a === b;
  }
}