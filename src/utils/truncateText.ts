export const truncateText = (text: string, length: number): string =>
  text.length > length || text.length === 0
    ? text.substring(0, length) + '...'
    : text
