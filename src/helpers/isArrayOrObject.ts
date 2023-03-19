import isPlainObject from "./isPlainObject";
import {Indexed} from "../utils/types";

export default function isArrayOrObject(value: unknown): value is [] | Indexed {
  return isPlainObject(value) || Array.isArray(value);
}
