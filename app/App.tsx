import { Stack } from "expo-router";
import { memo } from "react";

const App = () => {
  return (
    <>
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
        <Stack.Screen name="Settings" options={{ headerShown: false }} />
        <Stack.Screen name="Detail" options={{ headerShown: false }} />
        <Stack.Screen name="PayHistory" options={{ headerShown: false }} />
        <Stack.Screen name="ParkingHistory" options={{ headerShown: false }} />
        <Stack.Screen name="Wallet" options={{ headerShown: false }} />
        <Stack.Screen name="Feedback" options={{ headerShown: false }} />
        <Stack.Screen name="About" options={{ headerShown: false }} />
      </Stack>

    </>
  );
};
export default memo(App);
