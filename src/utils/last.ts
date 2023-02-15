export default function last<T>(list: T[]): T | undefined {
  if (!Array.isArray(list)) return undefined;
  if (!list.length) return undefined;
  return list[list.length - 1];
}
