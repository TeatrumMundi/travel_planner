export function isPastDate(year: number, month: number, day: number): boolean {
  const today = new Date();
  const date = new Date(year, month, day);
  return date.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
}