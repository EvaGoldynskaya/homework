import { DeepEqualEngine } from '../src/DeepEqualEngine.js';

describe('DeepEqualEngine', () => {
  let engine;
  
  //перед каждым тестом
  beforeEach(() => {
    engine = new DeepEqualEngine();
  });
  
  describe('Примитивные типы', () => {
    test('числа', () => {
      expect(engine.deepEqual(7, 7)).toBe(true);
      expect(engine.deepEqual(7, 48)).toBe(false);
    });
    
    test('строки', () => {
      expect(engine.deepEqual('cat', 'cat')).toBe(true);
      expect(engine.deepEqual('cat', 'dog')).toBe(false);
    });
    
    test('boolean', () => {
      expect(engine.deepEqual(true, true)).toBe(true);
      expect(engine.deepEqual(true, false)).toBe(false);
    });
    
    test('null и undefined', () => {
      expect(engine.deepEqual(null, null)).toBe(true);
      expect(engine.deepEqual(undefined, undefined)).toBe(true);
      expect(engine.deepEqual(null, undefined)).toBe(false);
    });
  });

  describe('Даты', () => {
    test('одинаковые даты', () => {
      const date1 = new Date('2026-04-25');
      const date2 = new Date('2026-04-25');
      expect(engine.deepEqual(date1, date2)).toBe(true);
    });

    test('разные даты', () => {
      const date1 = new Date('2026-04-25');
      const date2 = new Date('2026-04-20');
      expect(engine.deepEqual(date1, date2)).toBe(false);
    });
    
  });

  describe('Регулярные выражения', () => {
    test('одинаковые регулярные выражения', () => {
      expect(engine.deepEqual(/test/gi, /test/gi)).toBe(true);
    });
    
    test('разные регулярные выражения', () => {
      expect(engine.deepEqual(/test/gi, /tes/m)).toBe(false);
      expect(engine.deepEqual(/test/gi, /bo*/)).toBe(false);
    });
  });

  describe('Массивы', () => {
    test('пустые массивы', () => {
      expect(engine.deepEqual([], [])).toBe(true);
      expect(engine.deepEqual([], [1, 2])).toBe(false);
    });
    
    test('массивы одинаковой длины', () => {
      expect(engine.deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(engine.deepEqual([1, 2, 3], [0, 3, 8])).toBe(false);
    });

    test('массивы разной длины', () => {
      expect(engine.deepEqual([1, 2], [1, 2, 3])).toBe(false);
    });
    
    test('вложенные массивы', () => {
      expect(engine.deepEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
      expect(engine.deepEqual([1, [2, 3]], [1, [5, 3]])).toBe(false);
      expect(engine.deepEqual([7, [5, 3]], [1, [5, 3]])).toBe(false);
    });
  });

  describe('Объекты', () => {
    test('пустые объекты', () => {
      expect(engine.deepEqual({}, {})).toBe(true);
    });
    
    test('объекты с одинаковыми ключами ', () => {
      const obj1 = { name: 'Alexandra', age: 30 };
      const obj2 = { name: 'Alexandra', age: 30 };
      const obj3 = { name: 'Alexandra', age: 35 };
      expect(engine.deepEqual(obj1, obj2)).toBe(true);
      expect(engine.deepEqual(obj1, obj3)).toBe(false);
    });

    test('объекты с разными ключами ', () => {
      const obj1 = { name: 'Alexandra', age: 30 };
      const obj2 = { name: 'Alexandra', city: 'Saint-Petersburg' };
      expect(engine.deepEqual(obj1, obj2)).toBe(false);
    });

    test('объекты c разным количеством ключей', () => {
      const obj1 = { name: 'Alexandra', age: 30 };
      const obj2 = { name: 'Alexandra', age: 35 , city: 'Saint-Petersburg'};
      expect(engine.deepEqual(obj1, obj2)).toBe(false);
    });
    
    test('вложенные объекты', () => {
      const obj1 = { user: { name: 'Alexandra', address: { city: 'Saint-Petersburg' } } };
      const obj2 = { user: { name: 'Alexandra', address: { city: 'Saint-Petersburg' } } };
      const obj3 = { user: { name: 'Alexandra', address: { city: 'Moscow' } } };
      expect(engine.deepEqual(obj1, obj2)).toBe(true);
      expect(engine.deepEqual(obj1, obj3)).toBe(false);
    });
  });

  

  describe('Циклические ссылки', () => {
    test('объект ссылается сам на себя', () => {
      const obj = { name: 'cycle' };
      obj.self = obj;
      expect(engine.deepEqual(obj, obj)).toBe(true);
    });
    
    test('разные объекты', () => {
      const obj1 = { name: 'cycle1' };
      const obj2 = { name: 'cycle2' };
      obj1.self = obj1;
      obj2.self = obj2;
      expect(engine.deepEqual(obj1, obj2)).toBe(false);
    });
  });

  

});