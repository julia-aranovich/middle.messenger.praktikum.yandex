export default function first(list) {
  if (!Array.isArray(list)) return undefined;
  if (!list.length) return undefined;
  return list[0];
}
