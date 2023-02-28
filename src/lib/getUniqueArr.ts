export default function getUniqueArr<T>(array: T[]) {
  return array.filter((a, b) => array.indexOf(a) === b);
}
