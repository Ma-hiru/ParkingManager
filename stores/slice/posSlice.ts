import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "@/stores";


interface initialType {
  CurLnt: number;
  CurLat: number;
  Lnt: number;
  Lat: number;
  Id: number;
}

const posSlice = createSlice({
  name: "posStore",
  initialState: {
    CurLnt: 0,
    CurLat: 0,
    Lnt: 0,
    Lat: 0,
    Id: 0
  } satisfies initialType,
  reducers: {
    setCur: (state, action: PayloadAction<{
      CurLnt: number;
      CurLat: number;
    }>) => {
      state.CurLat = action.payload.CurLat;
      state.CurLnt = action.payload.CurLnt;
    },
    setPos: (state, action: PayloadAction<{
      Lnt: number;
      Lat: number;
      Id: number;
    }>) => {
      state.Lnt = action.payload.Lnt;
      state.Lat = action.payload.Lat;
      state.Id = action.payload.Id;
    }
  }
});
export const posReducer = posSlice.reducer;
export const posSelector = (root: RootStateType) => root.posStore;
export const posActions = posSlice.actions;
