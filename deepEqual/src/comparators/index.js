// Абстрактный базовый класс для сравнения
export class Comparator {
  compare(a, b) {
    throw new Error("Метод compare должен быть переопределен");
  }

  canHandle(value) {
    throw new Error("Метод canHandle должен быть переопределен");
  }
}

// Сравнение примитивных типов
export class PrimitiveComparator extends Comparator {
  canHandle(value) {
    return value == null || typeof value !== "object";
  }

  compare(a, b) {
    return a === b;
  }
}

// Сравнение массивов
export class ArrayComparator extends Comparator {
  canHandle(value) {
    return Array.isArray(value);
  }

  compare(a, b, context) {
    if (!Array.isArray(b) || a.length !== b.length) {
      return false;
    }

    return a.every((item, index) => context.deepEqual(item, b[index]));
  }
}

// Сравнение объектов
export class ObjectComparator extends Comparator {
  canHandle(value) {
    return value != null && typeof value === "object" && !Array.isArray(value);
  }

  compare(a, b, context) {
    if (typeof b !== "object" || b == null || Array.isArray(b)) {
      return false;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every(
      (key) => keysB.includes(key) && context.deepEqual(a[key], b[key])
    );
  }
}

// Компаратор для дат
export class DateComparator extends Comparator {
  canHandle(value) {
    return value instanceof Date;
  }

  compare(a, b) {
    return b instanceof Date && a.getTime() === b.getTime();
  }
}

// Компаратор для регулярных выражений
export class RegExpComparator extends Comparator {
  canHandle(value) {
    return value instanceof RegExp;
  }

  compare(a, b) {
    return b instanceof RegExp && a.source === b.source && a.flags === b.flags;
  }
}

//Компаратор для типа Map
export class MapComparator extends Comparator {
  canHandle(value) {
    return value instanceof Map;
  }
  
  compare(a, b, context) {
    if (!(b instanceof Map) || (a.size !== b.size)) {
      return false;
    }
    
    for (let [key, value] of a) {
      if (!b.has(key) || !context.deepEqual(value, b.get(key))) {
         return false;
      }
    }
    return true;
  }
}