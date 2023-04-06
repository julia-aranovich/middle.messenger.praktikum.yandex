import isPlainObject from "./isPlainObject";
import {Indexed} from "../utils/types";

export default function merge(lhs: Indexed, rhs: Indexed): Indexed {
  if (!isPlainObject(lhs) || !isPlainObject(rhs)) {
    throw new Error("arguments must be objects");
  }

  for (const p in rhs) {
    if (Object.prototype.hasOwnProperty.call(rhs, p)) {
      try {
        if (isPlainObject(rhs[p])) {
          rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
        } else {
          lhs[p] = rhs[p];
        }
      } catch (e) {
        lhs[p] = rhs[p];
      }
    }
  }
  return lhs;
}
