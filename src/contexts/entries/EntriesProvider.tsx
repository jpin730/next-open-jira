import { type Entry } from '@/interfaces/Entry'
import { type FC, useReducer, type ReactNode, useContext } from 'react'
import { EntriesActionType, EntriesContext, entriesReducer } from '.'
import { nextApi } from '@/api'
import { UiContext } from '../ui'
import { isAxiosError } from 'axios'
import { useSnackbar } from 'notistack'

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

  const { enqueueSnackbar } = useSnackbar()

  const addNewEntry = async (description: string): Promise<void> => {
    setLoading(true)
    try {
      const { data } = await nextApi.post<Entry>('/entries', { description })
      dispatch({ type: EntriesActionType.AddEntry, payload: data })
      enqueueSnackbar('Entry added successfully.')
      setLoading(false)
    } catch (error) {
      errorHandler(error)
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
      enqueueSnackbar('Entry updated successfully.')
      setLoading(false)
    } catch (error) {
      errorHandler(error)
    }
  }

  const resetEntries = async (): Promise<void> => {
    setLoading(true)
    try {
      await nextApi.get<Entry>('/seed')
      await fetchEntries()
      enqueueSnackbar('Entries restated successfully.')
      setLoading(false)
    } catch (error) {
      errorHandler(error)
    }
  }

  const fetchEntries = async (): Promise<void> => {
    setLoading(true)
    try {
      const { data } = await nextApi.get<Entry[]>('/entries')
      dispatch({ type: EntriesActionType.FetchEntries, payload: data })
      setLoading(false)
    } catch (error) {
      errorHandler(error)
    }
  }

  const deleteEntry = async ({ _id }: Entry): Promise<void> => {
    setLoading(true)
    try {
      const { data } = await nextApi.delete<Entry>(`/entries/${_id}`)
      dispatch({ type: EntriesActionType.DeleteEntry, payload: data })
      enqueueSnackbar('Entry deleted successfully.')
      setLoading(false)
    } catch (error) {
      errorHandler(error)
    }
  }

  const errorHandler = (error: unknown): void => {
    if (isAxiosError(error) && error.response?.data?.message !== undefined) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    } else {
      enqueueSnackbar('Something went wrong. Try again.', { variant: 'error' })
    }
    setLoading(false)
  }

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        resetEntries,
        deleteEntry,
        fetchEntries,
      }}
    >
      {children}
    </EntriesContext.Provider>
  )
}
