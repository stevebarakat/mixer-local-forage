export function array(length: number, filler?: unknown) {
  return Array(length).fill(filler || null);
}

export function roundFourth(num: number): number {
  return parseFloat((Math.round(num * 4) / 4).toFixed(2));
}

export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min); // min and max included
}

export function slugify(string: string) {
  return string
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function unSlugify(string: string) {
  if (typeof string !== "string") return;
  return string
    .replace(/-/g, " ")
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
}
