import { type UiState } from './'

export enum UiActionType {
  OpenSideBar = '[UI] Open SideBar',
  CloseSideBar = '[UI] Close SideBar',
  SetIsAddingEntry = '[UI] Set isAddingEntry',
  StartDragging = '[UI] Start Dragging',
  EndDragging = '[UI] End Dragging',
  SetLoading = '[UI] Set Loading',
}

type UiAction =
  | {
      type: UiActionType.OpenSideBar
    }
  | {
      type: UiActionType.CloseSideBar
    }
  | {
      type: UiActionType.SetIsAddingEntry
      payload: boolean
    }
  | {
      type: UiActionType.StartDragging
    }
  | {
      type: UiActionType.EndDragging
    }
  | {
      type: UiActionType.SetLoading
      payload: boolean
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

    case UiActionType.SetIsAddingEntry:
      return {
        ...state,
        isAddingEntry: action.payload,
      }

    case UiActionType.StartDragging:
      return {
        ...state,
        isDragging: true,
      }

    case UiActionType.EndDragging:
      return {
        ...state,
        isDragging: false,
      }

    case UiActionType.SetLoading:
      return {
        ...state,
        isLoading: action.payload,
      }

    default:
      return state
  }
}
