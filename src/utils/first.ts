export default function first<T>(list :T[]): T | undefined {
  if (!Array.isArray(list)) return undefined;
  if (!list.length) return undefined;
  return list[0];
}
