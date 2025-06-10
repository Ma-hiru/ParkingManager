import { FC, memo, useRef } from "react";
import { View, StatusBar } from "react-native";
import Map from "@/components/map/Map";
import InfoCard from "@/components/Parking/InfoCard";

type props = object;

const Parking: FC<props> = () => {
  const MapRef = useRef<Map.ref>(null);
  return (
    <>
      <StatusBar translucent={true} barStyle={"dark-content"} backgroundColor={"transparent"} />
      <View style={{ flex: 1, position: "relative" }}>
        <Map ref={MapRef} />
        <InfoCard />
      </View>

    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Parking);
