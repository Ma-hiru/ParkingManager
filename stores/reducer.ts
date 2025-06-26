import { userReducer } from "@/stores/slice/userSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { parkingReducer } from "@/stores/slice/parkingSlice";
import { posReducer } from "@/stores/slice/posSlice";

export default combineReducers({
  userStore: userReducer,
  parkingStore: parkingReducer,
  posStore: posReducer
});
