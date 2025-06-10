import { userReducer } from "@/stores/slice/userSlice";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
  userStore: userReducer
});
