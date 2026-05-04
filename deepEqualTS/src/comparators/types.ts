
// Обобщающий тип для примитивов
export type Primitive = string | number | boolean | null | undefined;
// Обобщающий тип для 
export type DeepEqualValue = Primitive | object | any[];

// Интерфейс для контекста 
export interface ComparisonContext {
  visited: WeakSet<object>;
  maxDepth: number;  
  options: DeepEqualOptions;
  deepEqual: <T>(a: T, b: T, ctx: ComparisonContext, depth: number ) => boolean;
}

// Опции для сравнения
export interface DeepEqualOptions {
  ignoreArrayOrder?: boolean;
  maxDepth?: number;
}

// Интерфейс для компараторов с рекурсией (объекты, массивы)
export interface RecursiveComparator<T = unknown> {
  canHandle(value: unknown): value is T;
  compare(a: T, b: T, context: ComparisonContext, depth: number): boolean;
}

//Интерфейс для компараторов где не нужна рекурсия и контекст
export interface LeafComparator<T = unknown> {
  canHandle(value: unknown): value is T;
  compare(a: T, b: T): boolean;
}

//Совмещенный тип компаратора для удобства использования
export type Comparator<T = unknown> = LeafComparator<T> | RecursiveComparator<T>;


