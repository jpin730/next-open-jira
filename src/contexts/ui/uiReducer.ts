import { type UiState } from './'

export enum UiActionType {
  OpenSideBar = '[UI] Open SideBar',
  CloseSideBar = '[UI] Close SideBar',
}

interface UiAction {
  type: UiActionType
}

export const uiReducer = (state: UiState, action: UiAction): UiState => {
  switch (action.type) {
    case UiActionType.OpenSideBar:
      return {
        ...state,
        sideMenuOpen: true,
      }

    case UiActionType.CloseSideBar:
      return {
        ...state,
        sideMenuOpen: false,
      }

    default:
      return state
  }
}
