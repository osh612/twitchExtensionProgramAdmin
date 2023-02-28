export default function addZero(num: number | string) {
  if (+num < 10) {
    return `0${String(num)}`;
  }
  return num;
}
