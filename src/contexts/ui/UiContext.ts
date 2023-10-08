import { createContext } from 'react'

interface ContextProps {
  sideMenuOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean
  isLoading: boolean
  isDarkTheme: boolean
  closeSideMenu: () => void
  openSideMenu: () => void
  setIsAddingEntry: (isAdding: boolean) => void
  endDragging: () => void
  startDragging: () => void
  setLoading: (isLoading: boolean) => void
  toggleTheme: () => void
}

export const UiContext = createContext({} as unknown as ContextProps)
