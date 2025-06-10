import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppStoreState } from "@/stores";

interface initialType {
  token: string;
}

const userSlice = createSlice({
  name: "userStore",
  initialState: {
    token: "Mahiru"
  } satisfies initialType,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setLogout: (state) => {
      state.token = "";
    }
  }
});
export const userReducer = userSlice.reducer;
export const userSelector = (root: AppStoreState) => root.userStore;
export const userActions = userSlice.actions;
