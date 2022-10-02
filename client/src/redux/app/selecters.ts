import { createSelector } from "reselect";
import { RootState } from "..";

const selectorAppState = (state: RootState) => state.app;

export const selectorUserInfo = createSelector(
  [selectorAppState],
  (app) => app.userInfo
);
