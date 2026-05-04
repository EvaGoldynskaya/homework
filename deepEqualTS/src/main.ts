import { DeepEqualEngine } from './DeepEqualEngine';
import { MapComparator } from './comparators/MapComparator';

const engine = new DeepEqualEngine();

//Сравнение разных типов объектов
console.log("Сравнение регулярных выражений" + engine.deepEqual(/abc/i, /abc/i)); //true
console.log("Сравнение примитивных типов - " + engine.deepEqual(1, 10)); //true
console.log("Сравнение массивов - " + engine.deepEqual([1, 2, 3, 4], [1, 2, 4])); //false
console.log("Сравнение дат - " + engine.deepEqual(new Date('2026-04-26'), new Date('2026-05-26'))); //false
console.log("Сравнение объектов - " + engine.deepEqual({ name: 'Alexandra', age: 25}, { name: 'Eva', age: 26})); //false

//Сравнение с параметрами
//Ограничение глубины рекурсии
const deepObj1 = { a: { b: { c: { d: 1 } } } };
const deepObj2 = { a: { b: { c: { d: 1 } } } };
//console.log(engine.deepEqual(deepObj1, deepObj2, { maxDepth: 2 }));  // ошибка
//console.log(engine.deepEqual(deepObj1, deepObj2, { maxDepth: 5 }));  // true

try {
  engine.deepEqual(deepObj1, deepObj2, {maxDepth: 5}); //true
} catch (e: any) {
    console.log('Ошибка:', e.message); 
}

try {
  engine.deepEqual(deepObj1, deepObj2, {maxDepth: 2});
} catch (e: any) {
    console.log('Ошибка:', e.message); 
}

//Сравнение массивов с учетом порядка и без учета
const arr1 = [1, 2, 3, 4] ;
const arr2 = [1, 2, 4, 3]
console.log("С учетом порядка - " + engine.deepEqual(arr1, arr2, { ignoreArrayOrder: false }))
console.log("Без учета порядка - " + engine.deepEqual(arr1, arr2, { ignoreArrayOrder: true }))


//Добавление нового компаратора и сравнение map 
engine.addComparator(new MapComparator());
const map1 = new Map([[1, "one"],[2, "two"],[3, "three"],]);
const map2 = new Map([[1, "one"],[2, "two"],[3, "three"],]);
const map3 = new Map([[1, "two"],[2, "three"],[3, "two"],[4, "four"],]);
console.log("Сравнение Map1 - " + engine.deepEqual(map1, map2)); //true
console.log("Сравнение Map2 - " + engine.deepEqual(map1, map3)); //false
