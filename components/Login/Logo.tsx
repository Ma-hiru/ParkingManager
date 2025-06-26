import { FC, memo, useMemo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { View as AniView } from "react-native-animatable";
import LogoIcon from "@/assets/tabs/parking.select.svg";
import { Image } from "expo-image";

interface props {
  formType: number;
}

const ShowAni = {
  0: {
    opacity: 0
  },
  1: {
    opacity: 1
  },
  easing: "ease-in-out"
} as const;
const Logo: FC<props> = ({ formType }) => {
  const subTitle = useMemo(() => {
    if (formType === 0) {
      return "密码登录";
    } else if (formType === 1) {
      return "邮箱登录";
    } else {
      return "注册账号";
    }
  }, [formType]);


  return (
    <View style={ContainerStyle}>
      <AniView key={formType} style={TitleStyle} animation={ShowAni}>
        <Text style={SubTitleStyle}>{subTitle}</Text>
      </AniView>
      <View style={LogoStyle}>
        <Image source={LogoIcon} style={{ width: 50, height: 50 }} />
      </View>
    </View>
  );
};
export default memo(Logo);
const { width: windowWidth } = Dimensions.get("window");
const {
  ContainerStyle,
  LogoStyle,
  TitleStyle,
  SubTitleStyle
} = StyleSheet.create({
  ContainerStyle: {
    width: windowWidth * 0.8,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  TextStyle: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5
  },
  LogoStyle: {
    alignItems: "flex-start"
  },
  TitleStyle: {},
  SubTitleStyle: {
    fontSize: 20,
    fontWeight: "bold"
  }
} as const);
