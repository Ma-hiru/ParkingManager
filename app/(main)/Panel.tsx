import { FC, memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppBtn from "@/components/AppBtn";
import { usePages } from "@/hooks/usePages";

type props = object;

const Panel: FC<props> = () => {
  const Pages = usePages();
  return (
    <>
      <View style={ContainerStyle}>
        <Text>Panel</Text>
        <AppBtn onPress={Pages.set("/Login", "FN")}>
          Login
        </AppBtn>
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Panel);
const {
  ContainerStyle
} = StyleSheet.create({
  ContainerStyle: {
    flex: 1,
  }
} as const);
