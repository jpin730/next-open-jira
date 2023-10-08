import { type Entry } from '@/interfaces/Entry'
import { createContext } from 'react'

interface ContextProps {
  entries: Entry[]
  addNewEntry: (description: string) => Promise<void>
  updateEntry: (entry: Entry) => Promise<void>
  deleteEntry: (entry: Entry) => Promise<void>
  fetchEntries: () => Promise<void>
  resetEntries: () => Promise<void>
}

export const EntriesContext = createContext({} as unknown as ContextProps)
