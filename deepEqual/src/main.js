import {DeepEqualEngine} from './DeepEqualEngine.js'
import {MapComparator} from "./comparators/index.js"

const engine = new DeepEqualEngine();

//Примеры использования deepEqual
//
//Сравнение регулярных выражений
const regex1 = /abc/i;
const regex2 = /abc/i;
console.log(engine.deepEqual(regex1, regex2)); //true

//Сравнение примитивных типов
const prim1 = 1;
const prim2 = '1';
console.log("Сравнение примитивных типов - " + engine.deepEqual(prim1, prim2)); //false

//Сравнение массивов
const arr1 = [1, 2, 3, 4];
const arr2 = [1, 2, 3, 4];
console.log("Сравнение массивов - " + engine.deepEqual(arr1, arr2)); //true

//Сравнение дат
const date1 = new Date('2026-04-25');
const date2 = new Date('2026-04-26');
console.log("Сравнение дат - " + engine.deepEqual(date1, date2)); //false

//Сравнение объектов
const obj1 = { name: 'Eva', age: 26, catAmount: 2, adress :{ country: 'Russia', city: 'Saint-Petersburg'} };
const obj2 = { name: 'Alexandra', age: 25, catAmount: 0, adress :{ country: 'Russia', city: 'Saint-Petersburg'} };
console.log("Сравнение объектов - " + engine.deepEqual(obj1, obj2)); //false

//Добавление нового компаратора и сравнение map 
engine.addComparator(new MapComparator());
const map1 = new Map([[1, "one"],[2, "two"],[3, "three"],]);
const map2 = new Map([[1, "one"],[2, "two"],[3, "three"],]);
const map3 = new Map([[1, "two"],[2, "three"],[3, "two"],[4, "four"],]);
console.log("Сравнение Map1 - " + engine.deepEqual(map1, map2)); //true
console.log("Сравнение Map2 - " + engine.deepEqual(map1, map3)); //false
