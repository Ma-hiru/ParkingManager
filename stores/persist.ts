import rootReducers from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Log } from "@/utils/logger";
import { throttle } from "lodash-es";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import localStore from "@/utils/localStore";

const loadPersistedState = async () => {
  try {
    const savedState = await localStore.getItem("reduxState");
    return savedState ? JSON.parse(savedState) : {};
  } catch (err) {
    Log.Console("Load state error:", err);
    return {};
  }
};

export let AppStore: AppStoreType;
export const setupStore = async () => {
  const preloadedState = await loadPersistedState();
  Log.Console("Load state success:", preloadedState);
  const store = configureStore({
    reducer: rootReducers,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false
      });
    }
  });
  store.subscribe(throttle(() => {
    const state = store.getState();
    localStore.setItem("reduxState", JSON.stringify(state));
  }, 1000));
  AppStore = store;
  return store;
};

export type AppStoreState = ReturnType<typeof rootReducers>
export type AppStoreType = ReturnType<typeof setupStore> extends Promise<infer Store> ? Store : never;
export type AppDispatch = AppStoreType["dispatch"];
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppStoreState> = useSelector;
