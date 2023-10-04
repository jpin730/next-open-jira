import { type Entry } from '@/interfaces/Entry'
import { type FC, useReducer, type ReactNode, useEffect } from 'react'
import { EntriesActionType, EntriesContext, entriesReducer } from '.'
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

  const addNewEntry = async (description: string): Promise<void> => {
    const { data } = await nextApi.post<Entry>('/entries', { description })
    dispatch({ type: EntriesActionType.AddEntry, payload: data })
  }

  const updateEntry = (entry: Entry): void => {
    dispatch({ type: EntriesActionType.UpdateEntry, payload: entry })
  }

  const fetchEntries = async (): Promise<void> => {
    const { data } = await nextApi.get<Entry[]>('/entries')
    dispatch({ type: EntriesActionType.FetchEntries, payload: data })
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
