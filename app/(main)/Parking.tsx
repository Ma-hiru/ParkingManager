import { FC, memo, useRef } from "react";
import { View, StatusBar } from "react-native";
import Map from "@/components/map/Map";
import { Button } from "@rneui/themed";
import { useLocation } from "@/hooks/useLocation";
import AppBtn from "@/components/AppBtn";
import { usePages } from "@/hooks/usePages";

type props = object;

const Parking: FC<props> = () => {
  const MapRef = useRef<Map.ref>(null);
  const Pages = usePages();
  const location = useLocation();
  return (
    <>
      <StatusBar translucent={true} barStyle={"dark-content"} backgroundColor={"transparent"} />
      <View style={{ flex: 1 }}>
        <Map ref={MapRef} />
      </View>
      <AppBtn loading={false} onPress={() => {
        const local = location.get().location;
        console.log(local);
        if (local) MapRef.current!.setCenter(local.coords.longitude, local.coords.latitude);
      }}>
        set Center
      </AppBtn>
      <AppBtn className="mt-4" loading={false} onPress={() => {
        Pages.set("/Login", "MOVE");
      }}>
        go login
      </AppBtn>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Parking);
