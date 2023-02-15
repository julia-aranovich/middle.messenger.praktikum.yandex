export default function last(list: any[]): any {
  if (!Array.isArray(list)) return undefined;
  if (!list.length) return undefined;
  return list[list.length - 1];
}
