import { FC, memo, ReactNode, useMemo } from "react";
import { AvatarBadge, AvatarFallbackText, AvatarImage, Avatar } from "@/components/ui/avatar";
import PressFeedback from "@/components/animate/PressFeedback";
import { View, Text, StyleSheet, StyleProp, ViewStyle, ColorValue } from "react-native";

const UserAvatar: FC<props> = (
  {
    uri,
    size = "lg",
    showBadge = true,
    BadgeColor,
    name,
    onPress,
    containerStyle,
    children
  }) => {
  const source = useMemo(() => {
    if (typeof uri === "string") {
      return { uri };
    } else {
      return uri;
    }
  }, [uri]);
  const styles = useMemo(() => [ContainerStyle, containerStyle], [containerStyle]);
  return (
    <View style={styles}>
      <PressFeedback onPress={onPress}>
        <Avatar size={size}>
          <AvatarFallbackText>{name}</AvatarFallbackText>
          <AvatarImage source={source} />
          {showBadge &&
            <AvatarBadge style={BadgeColor ? { backgroundColor: BadgeColor } : undefined} />}
        </Avatar>
      </PressFeedback>
      <View style={NameStyle}>
        <Text style={NameTextStyle}>{name}</Text>
        {children}
      </View>
    </View>
  );
};
export default memo(UserAvatar) as typeof UserAvatar;

const {
  ContainerStyle,
  NameStyle,
  NameTextStyle
} = StyleSheet.create({
  ContainerStyle: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
  NameStyle: {
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  NameTextStyle: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "bold"
  }
} as const);

interface props {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  uri?: string | number;
  showBadge?: boolean;
  onPress?: () => void;
  name?: string;
  containerStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
  BadgeColor?: ColorValue;
}
