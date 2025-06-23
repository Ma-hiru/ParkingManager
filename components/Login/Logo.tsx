import { FC, memo, useMemo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { View as AniView } from "react-native-animatable";

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
    } else {
      return "邮箱登录";
    }
  }, [formType]);


  return (
    <View style={ContainerStyle}>
      <View style={LogoStyle}>
        <Text style={TextStyle}>LOGO</Text>
      </View>
      <AniView key={formType} style={TitleStyle} animation={ShowAni}>
        <Text style={SubTitleStyle}>{subTitle}</Text>
      </AniView>
    </View>
  );
};
export default memo(Logo);
const { width: windowWidth } = Dimensions.get("window");
const {
  ContainerStyle,
  TextStyle,
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
    fontSize: 24,
    fontWeight: "bold"
  },
  LogoStyle: {},
  TitleStyle: {},
  SubTitleStyle: {
    fontSize: 16,
    fontWeight: "normal"
  }
} as const);
