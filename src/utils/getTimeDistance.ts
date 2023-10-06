import { formatDistanceToNow } from 'date-fns'

export const getTimeDistance = (date: number): string => {
  const fromNow = formatDistanceToNow(date)
  return fromNow
}
