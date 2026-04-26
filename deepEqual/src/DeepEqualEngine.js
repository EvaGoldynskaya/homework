import {ArrayComparator, PrimitiveComparator, ObjectComparator, DateComparator, RegExpComparator, Comparator} from "./comparators/index.js"

export class DeepEqualEngine {
  constructor() {
    this.comparators = [
      new PrimitiveComparator(),
      new DateComparator(),
      new RegExpComparator(),
      new ArrayComparator(),
      new ObjectComparator()
    ];
    this.visited = new WeakSet();
  }

  deepEqual(a, b) {
    // Проверка на циклические ссылки
    if (typeof a === "object" && a !== null) {
      if (this.visited.has(a)) {
        return a === b;
      }
      this.visited.add(a);
    }

    // Поиск подходящего компаратора
    const comparator = this.findComparator(a);
    if (!comparator) {
      throw new Error(`Не найден компаратор для типа: ${typeof a}`);
    }

    return comparator.compare(a, b, this);
  }

  findComparator(value) {
    return this.comparators.find((comp) => comp.canHandle(value));
  }

  // Метод для добавления новых компараторов
  addComparator(comparator) {
    if (!(comparator instanceof Comparator)) {
      throw new Error("Компаратор должен наследоваться от класса Comparator");
    }
    this.comparators.unshift(comparator); // добавляем в начало для приоритета
  }
}