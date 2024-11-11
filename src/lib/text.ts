export function limitTextCount(count: number): number | string {
  return count < 10000 ? count : "9999+";
}
