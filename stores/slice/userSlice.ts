import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "@/stores";
import AppConf from "@/settings";

interface initialType extends UserProfile {
}

const userSlice = createSlice({
  name: "userStore",
  initialState: {
    token: "",
    username: "",
    email: "",
    avatar: "",
    userId: 0
  } satisfies initialType,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setLogout: (state) => {
      state.token = "";
      state.username = "";
      state.email = "";
      state.avatar = "";
    },
    setLogin: (state, action: PayloadAction<initialType>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatar = AppConf.baseUrl + "/api" + action.payload.avatar;

      state.userId = action.payload.userId;
    }
  }
});
export const userReducer = userSlice.reducer;
export const userSelector = (root: RootStateType) => root.userStore;
export const userActions = userSlice.actions;
