import { FC, memo, ReactNode } from "react";
import { Text, View, StyleSheet, Dimensions, Pressable } from "react-native";


const OptionItem: FC<props> = (
  {
    showDivider = true,
    title,
    children,
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
  ContentStyle,
  TitleStyle
} = StyleSheet.create({
  Divider: {
    width: windowWidth,
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
  ContentStyle: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: windowWidth - 25,
    paddingRight: 10,
    paddingLeft: 20
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
