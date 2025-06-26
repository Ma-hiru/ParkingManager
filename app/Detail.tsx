import { FC, useCallback, useEffect } from "react";
import Header from "@/components/Header";
import { StyleSheet, View, FlatList } from "react-native";
import { useGetRouteParam } from "@/hooks/useGetRouteParam";
import { useAppDispatch, useAppSelector } from "@/stores";
import { parkingSelector } from "@/stores/slice/parkingSlice";
import { useImmer } from "use-immer";
import ParkingInfo from "@/components/Detail/ParkingInfo";
import ParkingArea from "@/components/Detail/ParkingArea";
import AppBtn from "@/components/AppBtn";
import { usePages } from "@/hooks/usePages";
import { posActions } from "@/stores/slice/posSlice";

type props = object;

const Detail: FC<props> = () => {
  const RouteParams = useGetRouteParam<DetailRouteParams>();
  const [parkingDetail, setParkingDetail] = useImmer<LotItem | undefined>(undefined);
  const { parkingLotList } = useAppSelector(parkingSelector);
  useEffect(() => {
    if (RouteParams && parkingLotList) {
      const current = parkingLotList.find(
        (item) => item.parkingLotId === Number(RouteParams.id)
      );
      setParkingDetail(current);
    }
  }, [RouteParams, parkingLotList, setParkingDetail]);
  const Pages = usePages();
  const dispatch = useAppDispatch();
  const { setPos } = posActions;
  const goToMap = useCallback(() => {
    // parkingDetail && dispatch(setPos({
    //   Lnt: parkingDetail.longitude,
    //   Lat: parkingDetail.latitude,
    //   Id: parkingDetail.parkingLotId
    // }));
    parkingDetail && dispatch(setPos({
      Lnt: 112.858981,
      Lat: 27.875375,
      Id: parkingDetail.parkingLotId
    }));
    Pages.back();
    parkingDetail && Pages.set("/Parking", "MOVE");
  }, [Pages, dispatch, parkingDetail, setPos]);
  return (
    <>
      <Header title={RouteParams.title} />
      <View style={ContainerStyle}>
        {parkingDetail && <ParkingInfo currentParking={parkingDetail} />}
        <View style={{ paddingLeft: 15, paddingRight: 15, marginBottom: 15 }}>
          <AppBtn onPress={goToMap}>路线导航</AppBtn>
        </View>
        <FlatList
          data={parkingDetail?.areas}
          renderItem={({ item }) => {
            return <ParkingArea key={item.parkingAreaId} area={item} />;
          }}
        />
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default Detail;

const { ContainerStyle } = StyleSheet.create({
  ContainerStyle: {
    flex: 1
  }
} as const);
