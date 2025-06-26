import "@/global.css";
import App from "@/app/App";
import { Provider } from "react-redux";
import RootState, { PersistedRootState } from "@/stores";
import { memo } from "react";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/settings/_permisson";
import { PersistGate } from "redux-persist/integration/react";

const RootLayout = () => {
  return (
    <>
      <GluestackUIProvider mode="light">
        <Provider store={RootState}>
          <PersistGate
            persistor={PersistedRootState}
            onBeforeLift={() => console.log("状态恢复中...")}
          >
            <App />
          </PersistGate>
        </Provider>
      </GluestackUIProvider>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(RootLayout);
