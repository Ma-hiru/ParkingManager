import { Stack } from "expo-router";
import { memo } from "react";
import { useFonts, getLoadedFonts } from "expo-font";
import FlyFlowerSongRegular from "@/assets/fonts/FlyFlowerSong-Regular.ttf";
import baigetianxingtiRegular from "@/assets/fonts/zihun50hao-baigetianxingti-Regular.ttf";
import { Log } from "@/utils/logger";


const App = () => {
  Log.Console("AppLoad");
  useFonts({ FlyFlowerSongRegular, baigetianxingtiRegular });
  Log.Console("LoadedFonts:", getLoadedFonts());
  return (
    <Stack screenOptions={{
      animation: "fade",
      animationDuration: 350,
      gestureEnabled: true,
      animationTypeForReplace: "pop",
      fullScreenGestureEnabled: true
    }}>
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="SearchParking" options={{ headerShown: false }} />
      <Stack.Screen name="Pay" options={{ headerShown: false }} />
      <Stack.Screen name="Register" options={{ headerShown: false }} />
      <Stack.Screen name="Settings" options={{ headerShown: false }} />
      <Stack.Screen name="Detail" options={{ headerShown: false }} />
    </Stack>
  );
};
export default memo(App);
