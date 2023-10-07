import { type Entry } from '@/interfaces/Entry'
import {
  type FC,
  useReducer,
  type ReactNode,
  useEffect,
  useContext,
} from 'react'
import { EntriesActionType, EntriesContext, entriesReducer } from '.'
import { nextApi } from '@/api'
import { UiContext } from '../ui'

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
  const { setLoading } = useContext(UiContext)
  const [state, dispatch] = useReducer(entriesReducer, entriesInitialState)

  const addNewEntry = async (description: string): Promise<void> => {
    setLoading(true)
    try {
      const { data } = await nextApi.post<Entry>('/entries', { description })
      dispatch({ type: EntriesActionType.AddEntry, payload: data })
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const updateEntry = async ({
    _id,
    status,
    description,
  }: Entry): Promise<void> => {
    setLoading(true)
    try {
      const { data } = await nextApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      })
      dispatch({ type: EntriesActionType.UpdateEntry, payload: data })
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const resetEntries = async (): Promise<void> => {
    setLoading(true)
    try {
      await nextApi.get<Entry>('/seed')
      await fetchEntries()
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const fetchEntries = async (): Promise<void> => {
    setLoading(true)
    try {
      const { data } = await nextApi.get<Entry[]>('/entries')
      dispatch({ type: EntriesActionType.FetchEntries, payload: data })
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const deleteEntry = async ({ _id }: Entry): Promise<void> => {
    setLoading(true)
    try {
      const { data } = await nextApi.delete<Entry>(`/entries/${_id}`)
      dispatch({ type: EntriesActionType.DeleteEntry, payload: data })
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchEntries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        resetEntries,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  )
}
