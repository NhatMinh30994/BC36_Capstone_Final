import { OPEN_DRAWER, CLOSE_DRAWER } from "../types/drawerType";

export const setOpenDrawer = () => {
  return {
    type: OPEN_DRAWER,
  };
};

export const setCloseDrawer = () => {
  return {
    type: CLOSE_DRAWER,
  };
};
