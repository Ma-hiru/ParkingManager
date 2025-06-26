import { FC, memo, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import AppConf from "@/settings";
import PressFeedback from "@/components/animate/PressFeedback";
import { useNavigation } from "expo-router";

const ParkingArea: FC<props> = ({ area }) => {
  const SpotsGroup = useMemo(() => {
    return area.spots.reduce((pre, cur, index) => {
      let arr = pre[Math.floor(index / 3)];
      if (!arr) {
        pre[Math.floor(index / 3)] = [cur];
      } else {
        pre[Math.floor(index / 3)].push(cur);
      }
      return pre;
    }, [] as ParkingSpot[][]);
  }, [area.spots]);
  useNavigation();
  return (
    <Card style={CardStyle} className={"shadow-lg"}>
      <Text style={TitleStyle}>{area.areaName}区</Text>
      <View style={PotsStyle}>
        {
          SpotsGroup.map((spots, index) => (
              <View key={index} style={ItemGroupStyle}>
                {
                  spots.map((spot) => (
                    <PressFeedback
                      containerStyle={[
                        ItemStyle,
                        { backgroundColor: spot.occupied ? "red" : "green" }
                      ]}
                      className={"shadow-lg"}
                      key={spot.parkingSpotId}
                    >
                      <Text style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 14,
                        textAlign: "center"
                      }}>
                        {spot.occupied ? spots[0].vehicleLicensePlate : "空闲"}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "light",
                          fontSize: 12,
                          textAlign: "center",
                          marginTop: 4
                        }}>
                        {spot.occupied ? "已占用" : "未占用"}
                      </Text>
                    </PressFeedback>
                  ))
                }
              </View>
            )
          )
        }
      </View>
    </Card>
  );
};
export default memo(ParkingArea) as typeof ParkingArea;
const windowScreen = Dimensions.get("window");
const {
  TitleStyle,
  PotsStyle,
  ItemStyle,
  ItemGroupStyle,
  CardStyle
} = StyleSheet.create({
  CardStyle: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 0,
    marginBottom: 12,
    borderRadius: 10
  },
  TitleStyle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: AppConf.Theme.ThemeColor,
    marginBottom: 10
  },
  PotsStyle: {
    width: windowScreen.width - 60
  },
  ItemStyle: {
    backgroundColor: "red",
    width: (windowScreen.width - 60) / 3 - 15,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10
  },
  ItemGroupStyle: {
    flexDirection: "row",
    marginBottom: 10,
    padding: 5,
    justifyContent: "space-around"
  }
} as const);

interface props {
  area: ParkingArea;
}
