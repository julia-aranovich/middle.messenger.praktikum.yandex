export default function first(list :any[]): any {
  if (!Array.isArray(list)) return undefined;
  if (!list.length) return undefined;
  return list[0];
}
