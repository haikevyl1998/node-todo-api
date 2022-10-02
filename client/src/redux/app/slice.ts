import { IUser } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  userInfo: IUser | null;
}

const initialState: State = {
  userInfo: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserInfo(state, { payload }: PayloadAction<IUser>) {
      state.userInfo = payload;
    },
  },
});

export const { setUserInfo } = appSlice.actions;

export default appSlice;
