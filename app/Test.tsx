import { FC } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import AppBtn from "@/components/AppBtn";
import { usePages } from "@/hooks/usePages";


type props = object;

const Test: FC<props> = () => {
  const Pages = usePages();


  return (
    <>
      <StatusBar translucent={true} barStyle={"dark-content"} backgroundColor={"transparent"} />
      <SafeAreaView className="flex-1 justify-center items-center">
        <AppBtn
          onPress={Pages.set("/(main)/Parking", "FN")}
        >
          go back to index
        </AppBtn>
      </SafeAreaView>
    </>
  );
};
export default Test;
