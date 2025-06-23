import "@/global.css";
import App from "@/app/App";
import { Provider } from "react-redux";
import { AppStore, setupStore } from "@/stores";
import { memo, useEffect, useState } from "react";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Log } from "@/utils/logger";
import { BackHandler } from "react-native";
import "./_permisson";

const RootLayout = () => {
  const [store, setStore] = useState<typeof AppStore | undefined>(AppStore);
  useEffect(() => {
    !store && setupStore().then(setStore).catch(() => {
        Log.AlertMessage("启动失败", "加载应用数据失败，请重试！");
        setTimeout(() => BackHandler.exitApp(), 5000);
      }
    );
  }, [store]);
  return (
    <>
      {
        store &&
        (
          <GluestackUIProvider mode="light">
            <Provider store={store}>
              <App />
            </Provider>
          </GluestackUIProvider>
        )
      }
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(RootLayout);
