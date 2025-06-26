import { FC, memo } from "react";
import Header from "@/components/Header";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import Logo from "@/assets/tabs/parking.select.svg";
import { Image } from "expo-image";

const About: FC<object> = () => {
  return (
    <>
      <Header title={"关于"} fill={false} />
      <View style={ContainerStyle}>
        <View style={ContentStyle}>
          <Image source={Logo} style={{ width: 80, height: 80, marginBottom: 10 }} />
          <Text style={NameStyle}>智慧停车</Text>
        </View>
        <View style={VersionStyle}>
          <Text style={VersionTextStyle}>2025年06月24日</Text>
          <Text style={VersionTextStyle}>应用版本号：1.14.514</Text>
        </View>
      </View>
    </>
  );
};
export default memo(About) as typeof About;

const {
  ContainerStyle,
  VersionStyle,
  VersionTextStyle,
  ContentStyle,
  NameStyle,
  LogoStyle
} = StyleSheet.create({
  ContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  ContentStyle: {
    justifyContent: "center",
    alignItems: "center"
  },
  NameStyle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center"
  },
  LogoStyle: {
    fontSize: 50,
    textAlign: "center"
  },
  VersionStyle: {
    position: "absolute",
    bottom: 15,
    width: "100%"
  },
  VersionTextStyle: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "bold"
  }
} as const);
