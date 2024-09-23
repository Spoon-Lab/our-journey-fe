export function formatTag(tag: string): string {
  return tag.startsWith('#') ? tag : `#${tag}`;
}

export function stripHashFromTag(tag: string): string {
  return tag.startsWith('#') ? tag.slice(1) : tag;
}
