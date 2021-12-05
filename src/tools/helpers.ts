export function toFixed(txt: string, n: number) {
  return txt
    .split(".")
    .map((part: string, i: number) => (i === 1 ? part.slice(0, n) : part))
    .join(".");
}
