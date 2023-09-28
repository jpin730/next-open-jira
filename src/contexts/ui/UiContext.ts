import { createContext } from 'react'

interface ContextProps {
  sideMenuOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean
  closeSideMenu: () => void
  openSideMenu: () => void
  setIsAddingEntry: (isAdding: boolean) => void
  endDragging: () => void
  startDragging: () => void
}

export const UiContext = createContext({} as unknown as ContextProps)
