import { FC } from "react";
import { StatusBar, SafeAreaView } from "react-native";
import { usePages } from "@/hooks/usePages";
import AppBtn from "@/components/AppBtn";


type props = object;

const Login: FC<props> = () => {
  const Pages = usePages();
  return (
    <>
      <StatusBar translucent={true} barStyle={"dark-content"} backgroundColor={"transparent"} />
      <SafeAreaView className="flex-1 justify-center items-center">
        <AppBtn onPress={Pages.set("/Test", "FN")}>
          go to test
        </AppBtn>
      </SafeAreaView>
    </>
  );
};
export default Login;
