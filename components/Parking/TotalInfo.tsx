import { FC, memo, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "@/components/ui/divider";
import spotIcon from "@/assets/Parking/spot.svg";
import totalIcon from "@/assets/Parking/total.svg";
import { Image } from "expo-image";
import PressFeedback from "@/components/animate/PressFeedback";
import { usePages } from "@/hooks/usePages";

const TotalInfo: FC<object> = () => {
  const Pages = usePages();
  const gotoSearchPage = useCallback(() => {
    Pages.set("/SearchParking", "MOVE");
  }, [Pages]);
  const gotoDetailPage = useCallback(() => {
    Pages.set({
      pathname: "/Detail",
      params: {
        title: "Test",
        id: "test"
      } satisfies DetailRouteParams
    }, "MOVE");
  }, [Pages]);
  return (
    <>
      <View style={ContainerStyle}>
        <PressFeedback onPress={gotoSearchPage}>
          <View style={ItemStyle}>
            <Image source={totalIcon} style={IconStyle} />
            <View>
              <Text style={NumStyle}>123</Text>
              <Divider style={DividerStyle} />
              <Text style={TitleStyle}>总数</Text>
            </View>
          </View>
        </PressFeedback>
        <PressFeedback onPress={gotoDetailPage}>
          <View style={ItemStyle}>
            <Image source={spotIcon} style={[IconStyle, { width: 36, height: 36 }]} />
            <View>
              <Text style={NumStyle}>123</Text>
              <Divider style={DividerStyle} />
              <Text style={TitleStyle}>最近余位</Text>
            </View>
          </View>
        </PressFeedback>
      </View>
    </>
  );
};
export default memo(TotalInfo);

const {
  ContainerStyle,
  NumStyle,
  TitleStyle,
  ItemStyle,
  DividerStyle,
  IconStyle
} = StyleSheet.create({
  ContainerStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  NumStyle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  TitleStyle: {
    fontSize: 12,
    textAlign: "center"
  },
  ItemStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  IconStyle: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  DividerStyle: {
    margin: 1
  }
} as const);
