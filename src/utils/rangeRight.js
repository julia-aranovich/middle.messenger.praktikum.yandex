import range from "./range";

export default function rangeRight(start, end, step) {
  return range(start, end, step, true);
}
