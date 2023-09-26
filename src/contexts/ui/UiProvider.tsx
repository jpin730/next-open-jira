import { type FC, type ReactNode, useReducer } from 'react'
import { UiActionType, UiContext, uiReducer } from './'

export interface UiState {
  sideMenuOpen: boolean
}

const uiInitialState: UiState = {
  sideMenuOpen: false,
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

  return (
    <UiContext.Provider
      value={{
        ...state,
        closeSideMenu,
        openSideMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  )
}
