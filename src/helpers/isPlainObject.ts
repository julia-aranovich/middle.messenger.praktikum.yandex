import {Indexed} from "../utils/types";

export default function isPlainObject(value: unknown): value is Indexed {
  return typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]";
}
