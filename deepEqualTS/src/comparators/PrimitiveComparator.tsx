import { LeafComparator, ComparisonContext, Primitive } from './types';

//
export class PrimitiveComparator implements LeafComparator<Primitive> {
  canHandle(value: unknown): value is Primitive {
    return value == null || typeof value !== "object";
  }

  compare(a: Primitive, b: Primitive, context: ComparisonContext): boolean {
    if (context.options.strict) {
      return a === b;
    }
    return a == b;
  }
}