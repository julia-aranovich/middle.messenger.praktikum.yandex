function isLength(value: any): boolean {
  return (
    typeof value === "number" &&
    value > -1 &&
    value % 1 === 0 &&
    value <= Number.MAX_SAFE_INTEGER
  );
}

function isNil(value: any): boolean {
  return value === null || value === undefined;
}

function isArrayLike(value: any): boolean {
  return !isNil(value) && typeof value !== "function" && isLength(value.length);
}

function isObjectLike(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function getTag(value: any): string {
  if (value === null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  return toString.call(value);
}

const objectProto = Object.prototype;

function isPrototype(value: any): boolean {
  const ctor = value && value.constructor;
  const proto = (typeof ctor === "function" && ctor.prototype) || objectProto;

  return value === proto;
}

function isArguments(value: any): boolean {
  return isObjectLike(value) && getTag(value) === "[object Arguments]";
}

// Реализация лодаша
export default function isEmpty(value: any): boolean {
  if (value === null) {
    return true;
  }

  if (
    isArrayLike(value) &&
    (Array.isArray(value) ||
      typeof value === "string" ||
      typeof value.splice === "function" ||
      // isBuffer(value) ||
      // isTypedArray(value) ||
      isArguments(value))
  ) {
    return !value.length;
  }

  const tag = getTag(value);
  if (tag === "[object Map]" || tag === "[object Set]") {
    return !value.size;
  }

  if (isPrototype(value)) {
    return !Object.keys(value).length;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key in value) {
    if (Object.hasOwnProperty.call(value, key)) {
      return false;
    }
  }

  return true;
}