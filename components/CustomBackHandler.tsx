import { useEffect } from "react";
import { BackHandler, Platform } from "react-native";
import { useRouter } from "expo-router";

export function CustomBackHandler() {
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === "android") {
      const backAction = () => {
        if (router.canGoBack()) {
          router.back();
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

      return () => backHandler.remove();
    }
  }, [router]);

  return null;
}
