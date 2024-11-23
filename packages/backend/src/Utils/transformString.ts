export function toArray(envVar: string) {
  return envVar ? envVar.split(',') : [];
}

export function shortenText(text: string, maxLength = 12) {
  return text.length > maxLength ? text.slice(0, maxLength - 3) + '...' : text;
}
