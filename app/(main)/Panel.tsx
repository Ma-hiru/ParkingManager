import { FC, memo } from "react";
import { StyleSheet, View } from "react-native";
import UserInfo from "@/components/Panel/UserInfo";
import Options from "@/components/Panel/Options";

const Panel: FC<object> = () => {
  return (
    <>
      <View style={ContainerStyle}>
        <UserInfo />
        <Options />
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
    flex: 1
  }
} as const);
