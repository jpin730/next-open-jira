import { type FC, type ReactNode, useReducer, useEffect } from 'react'
import { UiActionType, UiContext, uiReducer } from './'
import { ThemeProvider } from '@emotion/react'
import { darkTheme, lightTheme } from '@/themes'
import { CssBaseline } from '@mui/material'

export interface UiState {
  sideMenuOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean
  isLoading: boolean
  isDarkTheme: boolean
}

const uiInitialState: UiState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
  isLoading: false,
  isDarkTheme: false,
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

  const toggleTheme = (): void => {
    localStorage.setItem('theme', state.isDarkTheme ? 'light' : 'dark')
    dispatch({ type: UiActionType.ToggleTheme })
  }

  useEffect(() => {
    const theme = localStorage.getItem('theme')

    if (theme === 'light')
      dispatch({ type: UiActionType.ToggleTheme, payload: false })

    if (theme === 'dark')
      dispatch({ type: UiActionType.ToggleTheme, payload: true })
  }, [])

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
        toggleTheme,
      }}
    >
      <ThemeProvider theme={state.isDarkTheme ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </UiContext.Provider>
  )
}
