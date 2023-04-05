import { CLOSE_DRAWER, OPEN_DRAWER } from "../types/drawerType"

const DEFAULT_STATE = {
  open: false,
};

export const drawerReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case OPEN_DRAWER: {
      state.open = true;
      break;
    }
    case CLOSE_DRAWER: {
        state.open = false;
        break;
      }

    default:
      break;
  }
  return { ...state };
};
