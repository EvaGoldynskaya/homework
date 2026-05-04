import { Comparator, RecursiveComparator, LeafComparator, ComparisonContext, DeepEqualValue, DeepEqualOptions } from './comparators/types';
import { PrimitiveComparator } from './comparators/PrimitiveComparator';
import { DateComparator } from './comparators/DateComparator';
import { RegExpComparator } from './comparators/RegExpComparator';
import { ArrayComparator } from './comparators/ArrayComparator';
import { ObjectComparator } from './comparators/ObjectComparator';


export class DeepEqualEngine {
  private comparators: Comparator[] = [];

  constructor() {
    this.comparators = [
      new PrimitiveComparator(),
      new DateComparator(),
      new RegExpComparator(),
      new ArrayComparator(),
      new ObjectComparator()
    ];
  }

  deepEqual(a: DeepEqualValue, b: DeepEqualValue, options: DeepEqualOptions = {}): boolean {
    
    //Проверка типов
    if (typeof a !== typeof b) return false;

    const context: ComparisonContext = {
      visited: new WeakSet(),
      maxDepth: options.maxDepth ?? 20,
      options: {
        ignoreArrayOrder: options.ignoreArrayOrder ?? false
      },
      deepEqual: this.compareWithContext.bind(this)
    };

    return this.compareWithContext(a, b, context, 0);
  }

  private compareWithContext<T>(a: T, b: T, context: ComparisonContext, depth: number): boolean {
    if (depth > context.maxDepth) {
        throw new Error(`Превышена максимальная глубина рекурсии`);
    };

    // Проверка циклических ссылок
    if (typeof a === 'object' && a !== null) {
      if (context.visited.has(a as object)) {
        return a === b;
      }
      context.visited.add(a as object);
    }

    const comparator = this.findComparator(a);
    if (!comparator) {
        throw new Error(`Не найден компаратор для типа: ${typeof a}`);
    };

    // Сравнение
    let result: boolean;
    if (this.isRecursiveComparator(comparator)) {
      result = comparator.compare(a, b, context, depth);
    } else {
      result = (comparator as LeafComparator).compare(a, b);
    }

    // Очистка visited на случай повторения в объекте
    if (typeof a === 'object' && a !== null) {
      context.visited.delete(a as object);
    }

    return result;
  }

  // Определение типа компоратора, чтобы передавать или не передавать depth
  private isRecursiveComparator(comparator: Comparator): comparator is RecursiveComparator {
    return comparator.compare.length === 4;
  }

  // Поиск нужного компаратора
  private findComparator(value: unknown): Comparator | undefined {
    return this.comparators.find(comp => comp.canHandle(value));
  }

  // Добавление нового компаратора
  addComparator(comparator: Comparator): void {
    this.comparators.unshift(comparator);
  }
}