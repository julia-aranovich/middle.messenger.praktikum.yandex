export default function last(list) {
  if (!Array.isArray(list)) return undefined;
  if (!list.length) return undefined;
  return list[list.length - 1];
}
