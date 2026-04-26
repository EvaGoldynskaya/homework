import {DeepEqualEngine} from './DeepEqualEngine.js'

const engine = new DeepEqualEngine();



//Сравнение регулярных выражений
const regex1 = /abc/i;
const regex2 = /test/gi;
console.log(engine.deepEqual(regex1, regex2)); 