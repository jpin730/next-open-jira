import { type FC, type ReactNode, useReducer } from 'react'
import { UiActionType, UiContext, uiReducer } from './'

export interface UiState {
  sideMenuOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean
  isLoading: boolean
}

const uiInitialState: UiState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
  isLoading: false,
}

interface Props {
  children: ReactNode
}

export const UiProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, uiInitialState)

  const openSideMenu = (): void => {
    dispatch({ type: UiActionType.OpenSideBar })
  }

  const closeSideMenu = (): void => {
    dispatch({ type: UiActionType.CloseSideBar })
  }

  const setIsAddingEntry = (isAdding: boolean): void => {
    dispatch({ type: UiActionType.SetIsAddingEntry, payload: isAdding })
  }

  const startDragging = (): void => {
    dispatch({ type: UiActionType.StartDragging })
  }

  const endDragging = (): void => {
    dispatch({ type: UiActionType.EndDragging })
  }

  const setLoading = (isLoading: boolean): void => {
    dispatch({ type: UiActionType.SetLoading, payload: isLoading })
  }

  return (
    <UiContext.Provider
      value={{
        ...state,
        closeSideMenu,
        openSideMenu,
        setIsAddingEntry,
        endDragging,
        startDragging,
        setLoading,
      }}
    >
      {children}
    </UiContext.Provider>
  )
}
