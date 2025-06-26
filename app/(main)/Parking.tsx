import { FC, memo, useCallback, useEffect, useRef } from "react";
import { View, StatusBar, Dimensions, StyleSheet } from "react-native";
import Map from "@/components/map/Map";
import InfoCard from "@/components/Parking/InfoCard";
import InfoContent from "@/components/Parking/InfoContent";
import AppConf from "@/settings";
import { useReactive } from "ahooks";
import { useFocusEffect, useNavigation } from "expo-router";
import { ExitApp } from "@/utils/exitAPP";
import { usePages } from "@/hooks/usePages";

const Parking: FC<object> = () => {
  const navigation = useNavigation();
  useFocusEffect(ExitApp(navigation));
  const MapRef = useRef<Map.ref>(null);
  const CardRef = useRef<InfoCard.ref>(null);
  const ContentRef = useRef<InfoContent.ref>(null);
  const Pages = usePages();
  const changeNumber = useRef(0);
  const onSearchPress = useCallback(() => {
    Pages.set("/SearchParking", "MOVE");
  }, [Pages]);
  const contentData = useReactive({
    totalData: {},
    detailData: {}
  });
  useEffect(() => {
    CardRef.current?.openCard();
  }, []);
  return (
    <>
      <StatusBar translucent={true} barStyle={"dark-content"} backgroundColor={"transparent"} />
      <View style={ContainerStyle}>
        <Map ref={MapRef} />
        <InfoCard ref={CardRef} onSearchPress={onSearchPress}>
          <InfoContent
            data={[contentData.totalData, contentData.detailData]}
            width={InfoContentWidth}
            height={InfoContentHeight}
            ref={ContentRef}
          />
        </InfoCard>
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Parking);

const {
  ContainerStyle
} = StyleSheet.create({
  ContainerStyle: { flex: 1, position: "relative" }
} as const);
const { width: screenWidth } = Dimensions.get("window");
const InfoContentWidth =
  screenWidth * AppConf.Theme.Parking.InfoCardWidth / 100
  - AppConf.Theme.Parking.InfoCardPadding * 2;
const InfoContentHeight =
  AppConf.Theme.Parking.InfoCardSlideHeight
  - AppConf.Theme.Parking.InfoCardPadding;
