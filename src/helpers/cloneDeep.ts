type ReturnedType<T> = T | Date | Set<unknown> | Map<unknown, unknown> | object | T[];

export default function cloneDeep<T extends object = object>(obj: T) {
  // eslint-disable-next-line @typescript-eslint/naming-convention, wrap-iife
  return (function _cloneDeep(item: T): ReturnedType<T> {
    // Handle:
    // * null
    // * undefined
    // * boolean
    // * number
    // * string
    // * symbol
    // * function
    if (item === null || typeof item !== "object") {
      return item;
    }

    // Handle:
    // * Date
    if (item instanceof Date) {
      return new Date(item.valueOf());
    }

    // Handle:
    // * Array
    if (item instanceof Array) {
      const copy: ReturnedType<T>[] = [];

      item.forEach((_, i) => {
        copy[i] = _cloneDeep(item[i]);
      });

      return copy;
    }

    // Handle:
    // * Set
    if (item instanceof Set) {
      const copy = new Set();

      item.forEach((v) => copy.add(_cloneDeep(v)));

      return copy;
    }

    // Handle:
    // * Map
    if (item instanceof Map) {
      const copy = new Map();

      item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

      return copy;
    }

    // Handle:
    // * Object
    if (item instanceof Object) {
      const copy: Record<string | number | symbol, ReturnedType<T>> = {};

      // Handle:
      // * Object.symbol
      Object.getOwnPropertySymbols(item).forEach((s) => {
        // @ts-ignore
        copy[s] = _cloneDeep(item[s]);
      });

      // Handle:
      // * Object.name (other)
      Object.keys(item).forEach((k) => {
        // @ts-ignore
        copy[k] = _cloneDeep(item[k]);
      });

      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  })(obj);
}
