import { EntryStatus, type Entry } from '@/interfaces/Entry'
import { type FC, useReducer, type ReactNode } from 'react'
import { EntriesActionType, EntriesContext, entriesReducer } from '.'
import { v4 as uuidv4 } from 'uuid'

export interface EntriesState {
  entries: Entry[]
}

const entriesInitialState: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        'Pending: Proident dolor duis elit sunt qui dolor laborum veniam ea laboris qui consequat.',
      status: EntryStatus.pending,
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        'In-progress: Veniam in cupidatat adipisicing Lorem sunt est est ex cillum laboris fugiat officia fugiat.',
      status: EntryStatus.inProgress,
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description:
        'Done: Commodo veniam aliqua tempor officia officia non laborum.',
      status: EntryStatus.done,
      createdAt: Date.now() - 100000,
    },
  ],
}

interface Props {
  children: ReactNode
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, entriesInitialState)

  const addNewEntry = (description: string): void => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: EntryStatus.pending,
    }

    dispatch({ type: EntriesActionType.AddEntry, payload: newEntry })
  }

  const updateEntry = (entry: Entry): void => {
    dispatch({ type: EntriesActionType.UpdateEntry, payload: entry })
  }

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  )
}
