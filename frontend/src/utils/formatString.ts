export function formatStringToLimitChars(s: string, limit: number) {
  return s.substring(0, limit) + "...";
}
