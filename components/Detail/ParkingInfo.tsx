import { FC, memo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Divider } from "@/components/ui/divider";
import { useNavigation } from "expo-router";
import { Image } from "expo-image";
import AppConf from "@/settings";
import { Card } from "@/components/ui/card";

const ParkingInfo: FC<props> = ({ currentParking }) => {
  useNavigation();
  return (
    <Card style={{ margin: 15, borderRadius: 10 }} className={"shadow-lg"}>
      <View style={ContainerStyle} className={"shadow-2xl"}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={currentParking?.image}
            contentFit={"cover"}
            style={{ width: 180, height: 120, borderRadius: 10 }}
          />
          <Text style={{
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 5,
            textAlign: "center",
            marginBottom: 5
          }}>
            {currentParking?.parkingName}
          </Text>
          <Text
            style={{ fontSize: 12, textAlign: "center" }}
          >
            {currentParking?.address}
          </Text>
        </View>
        <Divider orientation={"vertical"} />
        <View>
          <View style={InfoItemStyle}>
            <Text style={InfoTextStyle}>{1.2}km</Text>
            <Text style={InfoTextLabelStyle}>距离</Text>
          </View>
          <View style={InfoItemStyle}>
            <Text style={InfoTextStyle}>{currentParking?.price}元/分</Text>
            <Text style={InfoTextLabelStyle}>价格</Text>
          </View>
          <View style={InfoItemStyle}>
            <Text style={InfoTextStyle}>{currentParking?.openingHours}</Text>
            <Text style={InfoTextLabelStyle}>时间</Text>
          </View>
          <View style={InfoItemStyle}>
            <Text
              style={[
                InfoTextStyle,
                { color: currentParking!.spaces < 15 ? "red" : "green" }
              ]}>
              {currentParking?.spaces === 1 ? 4 : currentParking?.spaces}
            </Text>
            <Text style={InfoTextLabelStyle}>车位</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};
export default memo(ParkingInfo) as typeof ParkingInfo;

const {
  ContainerStyle,
  InfoTextStyle,
  InfoTextLabelStyle,
  InfoItemStyle
} = StyleSheet.create({
  ContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 200
  },
  InfoTextStyle: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "light",
    marginTop: 5,
    margin: "auto"
  },
  InfoTextLabelStyle: {
    fontWeight: "bold",
    backgroundColor: AppConf.Theme.ThemeColor,
    color: "white",
    borderRadius: 1,
    padding: 1,
    lineHeight: 20,
    marginLeft: 5
  },
  InfoItemStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 3
  }

} as const);

interface props {
  currentParking?: LotItem;
}
