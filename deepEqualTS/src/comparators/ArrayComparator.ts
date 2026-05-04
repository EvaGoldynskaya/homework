import { RecursiveComparator, ComparisonContext } from './types';

// Компаратор для массивов
export class ArrayComparator implements RecursiveComparator<any[]> {
  
 canHandle(value: unknown): value is any[] {
    return Array.isArray(value);
  }

  compare(a: any[], b: any[], context: ComparisonContext, depth: number): boolean {

    //Проверка на тип и размер
    if (!Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    
    if (context.options.ignoreArrayOrder) {
      return this.compareUnordered(a, b, context, depth);
    }
    return this.compareOrdered(a, b, context, depth);
  }

  //Сравнение с учетом порядка элементов
  private compareOrdered(a: any[], b: any[], context: ComparisonContext, depth: number): boolean {
    return a.every((item, index) => context.deepEqual(item, b[index], context, depth+1))
  }

  //Сравнение без учета порядка элементов
  private compareUnordered(a: any[], b: any[], context: ComparisonContext, depth: number): boolean {
    const used = new Array(b.length).fill(false);
    
    //Поиск совпадения элемента
    for (const itemA of a) {
      let found = false;
      
      for (let i = 0; i < b.length; i++) {
        if (!used[i] && context.deepEqual(itemA, b[i], context, depth + 1)) {
          found = true;
          used[i] = true;
          break;
        }
      }
      
      if (!found) return false;
    }
    
    return true;
  }

}