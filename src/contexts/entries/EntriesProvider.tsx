import { EntryStatus, type Entry } from '@/interfaces/Entry'
import { type FC, useReducer, type ReactNode, useEffect } from 'react'
import { EntriesActionType, EntriesContext, entriesReducer } from '.'
import { v4 as uuidv4 } from 'uuid'
import { nextApi } from '@/api'

export interface EntriesState {
  entries: Entry[]
}

const entriesInitialState: EntriesState = {
  entries: [],
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

  const fetchEntries = async (): Promise<void> => {
    const { data } = await nextApi.get<{ entries: Entry[] }>('/entries')
    dispatch({ type: EntriesActionType.FetchEntries, payload: data.entries })
  }

  useEffect(() => {
    void fetchEntries()
  }, [])

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
