import { FC, memo, ReactNode } from "react";
import { Text, View, StyleSheet, Dimensions, Pressable } from "react-native";
import { Image } from "expo-image";

const ListItem: FC<props> = (
  {
    showDivider = true,
    title,
    children,
    onPress,
    parkingItem
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
          <View style={{ justifyContent: "space-around", alignItems: "flex-start" }}>
            <Image source={parkingItem.image} style={CoverStyle} contentFit={"cover"}/>
            <Text>{parkingItem.parkingName}</Text>
          </View>
          <View>
            <Text style={{
              textAlign: "center",
              fontWeight: "light",
              fontSize: 12
            }}>{parkingItem.open ? "开放" : "关闭"}</Text>
            <Text style={{
              textAlign: "center", fontWeight: "light",
              fontSize: 13
            }}>{parkingItem.openingHours}</Text>
            <Text style={{
              textAlign: "center", fontWeight: "light",
              fontSize: 13
            }}>{parkingItem.address}</Text>
          </View>
          <View>
            <Text style={{ textAlign: "right", fontSize: 12 }}>{parkingItem.price}km</Text>
            <Text style={{ textAlign: "right", fontSize: 12 }}>{parkingItem.price}元/时</Text>
            <Text style={{
              textAlign: "right",
              color: parkingItem.spaces < 15 ? "red" : "green",
              fontSize: 13
            }}>{parkingItem.spaces} 车位</Text>

          </View>
          {
            showDivider && <View style={Divider} />
          }
        </View>
      </View>
    </Pressable>
  );
};
export default memo(ListItem) as typeof ListItem;
const { width: windowWidth } = Dimensions.get("window");
const {
  Divider,
  CardStyle,
  ContentStyle,
  CoverStyle
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
    height: 75
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
  CoverStyle: {
    width: 40,
    height: 40,
    marginBottom: 5
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
  parkingItem: LotItem;
}
