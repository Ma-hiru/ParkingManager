import { FC, memo, ReactNode } from "react";
import { Text, View, StyleSheet, Dimensions, Pressable } from "react-native";
import { Image } from "expo-image";

const OptionItem: FC<props> = (
  {
    showDivider = true,
    iconWidth = 18,
    iconHeight = 18,
    title,
    children,
    icon,
    onPress
  }) => {
  return (
    <Pressable
      android_ripple={{
        color: "rgba(0, 0, 0, 0.2)",
        borderless: false,
        radius: 300
      }}
      onPress={onPress}
    >
      <View style={CardStyle}>
        <View style={IconStyle}>
          <Image
            source={icon}
            style={{ width: iconWidth, height: iconHeight }}
          />
        </View>
        <View style={ContentStyle}>
          <Text style={TitleStyle}>{title}</Text>
          {children}
          {
            showDivider && <View style={Divider} />
          }
        </View>
      </View>
    </Pressable>
  );
};
export default memo(OptionItem) as typeof OptionItem;
const { width: windowWidth } = Dimensions.get("window");
const {
  Divider,
  CardStyle,
  IconStyle,
  ContentStyle,
  TitleStyle
} = StyleSheet.create({
  Divider: {
    width: windowWidth - 10 - 50,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 0.2,
    position: "absolute",
    bottom: 0
  },
  CardStyle: {
    flexDirection: "row",
    width: windowWidth,
    paddingLeft: 10,
    paddingRight: 10,
    height: 55
  },
  IconStyle: {
    height: 55,
    width: 40,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  ContentStyle: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: windowWidth - 10 - 50,
    paddingRight: 20
  },
  TitleStyle: {
    textAlign: "left",
    fontSize: 14.5
  }
} as const);

interface props {
  showDivider?: boolean;
  iconWidth?: number;
  iconHeight?: number;
  title?: string;
  icon?: ReactNode;
  children?: ReactNode;
  onPress?: () => void;
}
