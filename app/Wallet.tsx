import { FC, memo, useState } from "react";
import Header from "@/components/Header";
import { StyleSheet, View, Text } from "react-native";
import countIcon from "@/assets/Wallet/count.svg";
import { Divider, IUIDividerProps } from "@/components/ui/divider";
import { Image } from "expo-image";
import AppBtn from "@/components/AppBtn";
import { useNavigation } from "expo-router";

const TypedDivider = Divider as FC<IUIDividerProps>;
const Wallet: FC<object> = () => {
  const [count, setCount] = useState(114.514);
  useNavigation();
  return (
    <>
      <Header title={"钱包"} />
      <View className={"shadow-lg"} style={ContainerStyle}>
        <View style={CardStyle}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image source={countIcon} style={{ width: 30, height: 30 }} />
            <Text style={{ color: "#1B6BFF" }}>账户余额</Text>
          </View>
          <TypedDivider orientation="vertical" />
          <Text style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#1B6BFF"
          }}>￥{count.toFixed(2)}</Text>
        </View>
        <View style={{ position: "absolute", bottom: 20, width: "80%", left: "10%" }}>
          <AppBtn>充值</AppBtn>
          <AppBtn containerStyle={{ marginTop: 15 }}>提现</AppBtn>
        </View>
      </View>
    </>
  );
};
export default memo(Wallet) as typeof Wallet;

const {
  CardStyle,
  ContainerStyle
} = StyleSheet.create({
  CardStyle: {
    margin: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 150
  },
  ContainerStyle: {
    flex: 1,
    position: "relative"
  }
} as const);
