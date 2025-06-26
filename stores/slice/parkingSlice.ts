import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "@/stores";
import AppConf from "@/settings";

interface LotItem extends ParkingLot {
  spaces: number;
  price: number;
}

interface initialType {
  parkingLotList: LotItem[];
  mostSpaces: number;
  mostSpacesItem?: LotItem;
  mostSpacesIndex: number;
}

const parkingSlice = createSlice({
  name: "userStore",
  initialState: {
    parkingLotList: [] as any,
    mostSpaces: 0,
    mostSpacesItem: undefined,
    mostSpacesIndex: 0
  } as initialType,
  reducers: {
    setList: (state, action: PayloadAction<LotItem[]>) => {
      state.parkingLotList = action.payload.map((item) => {
        console.log(AppConf.baseUrl + item.image);
        return {
          ...item,
          image: AppConf.baseUrl + "/api" + item.image
        };
      });
    },
    clearList: (state) => {
      state.parkingLotList = [];
    },
    setMostSpaces: (state, action: PayloadAction<{
      mostSpaces: number;
      mostSpacesItem?: LotItem;
      mostSpacesIndex: number;
    }>) => {
      state.mostSpaces = action.payload.mostSpaces;
      state.mostSpacesItem = action.payload.mostSpacesItem;
      state.mostSpacesIndex = action.payload.mostSpacesIndex;
    }
  }
});
export const parkingReducer = parkingSlice.reducer;
export const parkingSelector = (root: RootStateType) => root.parkingStore;
export const parkingActions = parkingSlice.actions;
