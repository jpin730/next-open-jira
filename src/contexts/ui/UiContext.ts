import { createContext } from 'react'

interface ContextProps {
  sideMenuOpen: boolean
  closeSideMenu: () => void
  openSideMenu: () => void
}

export const UiContext = createContext({} as unknown as ContextProps)
