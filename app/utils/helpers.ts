export function array(length: number, filler?: unknown) {
  return Array(length).fill(filler || null);
}

export function roundFourth(num: number): number {
  return parseFloat((Math.round(num * 4) / 4).toFixed(2));
}

export function unSlugify(string: string) {
  return string
    .replace(/-/g, " ")
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
}
