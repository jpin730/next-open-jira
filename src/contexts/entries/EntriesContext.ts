import { type Entry } from '@/interfaces/Entry'
import { createContext } from 'react'

interface ContextProps {
  entries: Entry[]
  addNewEntry: (description: string) => void
  updateEntry: (entry: Entry) => void
}

export const EntriesContext = createContext({} as unknown as ContextProps)
