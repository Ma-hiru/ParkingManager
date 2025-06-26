import { FC, memo, ReactNode, useMemo } from "react";
import {
  ColorValue,
  StatusBar,
  StatusBarStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import { useSafeArea } from "@/hooks/useSafeArea";
import { useNavigation } from "expo-router";
import { Image } from "expo-image";
import { usePages } from "@/hooks/usePages";
import back_icon from "@/assets/back.svg";
import PressFeedback from "@/components/animate/PressFeedback";

interface props {
  title?: ReactNode;
  back?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  fill?: boolean;
  barStyle?: StatusBarStyle | null;
  barColor?: ColorValue;
  background?: boolean;
}

const Header: FC<props> = (
  {
    title,
    back = true,
    containerStyle,
    titleStyle,
    fill = true,
    barStyle = "dark-content",
    barColor = "transparent",
    background = true
  }) => {
  const { topInset } = useSafeArea();
  const Page = usePages();
  useNavigation();
  const Styles = useMemo(() => [
    ContainerStyle,
    { paddingTop: topInset },
    containerStyle,
    !fill && NoFillStyle
  ], [containerStyle, fill, topInset]);
  return (
    <>
      <StatusBar translucent={true} barStyle={barStyle} backgroundColor={barColor} />
      <View className="shadow-lg"
            style={Styles}>
        {
          back && <PressFeedback
            onPress={Page.back}
            minScale={0.5}
            containerStyle={{
              ...BackContainerStyle,
              top: topInset,
              height: ContainerStyle.height - topInset
            }}>
            <Image source={back_icon} style={BackStyle} />
          </PressFeedback>
        }
        {
          typeof title === "string"
            ? (
              <Text
                style={{
                  ...TitleStyle,
                  height: ContainerStyle.height - topInset,
                  ...titleStyle as object
                }}
              >
                {title}
              </Text>
            )
            : title
        }
      </View>
    </>
  );
};
export default memo(Header);

const {
  ContainerStyle,
  TitleStyle,
  BackStyle,
  BackContainerStyle,
  NoFillStyle
} = StyleSheet.create({
  ContainerStyle: {
    width: "100%",
    height: 90,
    backgroundColor: "white",
    position: "relative"
  },
  NoFillStyle: {
    position: "absolute",
    top: 0,
    zIndex: 10
  },
  TitleStyle: {
    textAlign: "center",
    fontSize: 16,
    verticalAlign: "middle",
    fontWeight: "bold"
  },
  BackStyle: {
    width: 35,
    height: 35
  },
  BackContainerStyle: {
    position: "absolute",
    justifyContent: "center",
    left: 2,
    zIndex: 10
  }
} as const);
