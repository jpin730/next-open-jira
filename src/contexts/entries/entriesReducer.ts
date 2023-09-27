import { type Entry } from '@/interfaces/Entry'
import { type EntriesState } from '.'

export enum EntriesActionType {
  AddEntry = '[Entry] Add entry',
  UpdateEntry = '[Entry] Update entry',
}

type EntriesAction =
  | {
      type: EntriesActionType.AddEntry
      payload: Entry
    }
  | {
      type: EntriesActionType.UpdateEntry
      payload: Entry
    }

export const entriesReducer = (
  state: EntriesState,
  action: EntriesAction,
): EntriesState => {
  switch (action.type) {
    case EntriesActionType.AddEntry:
      return {
        ...state,
        entries: [...state.entries, action.payload],
      }

    case EntriesActionType.UpdateEntry:
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status
            entry.description = action.payload.description
          }
          return entry
        }),
      }

    default:
      return state
  }
}
