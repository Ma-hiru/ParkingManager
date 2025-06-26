import { FC, memo, useCallback, useEffect } from "react";
import Header from "@/components/Header";
import { useImmer } from "use-immer";
import { View, StyleSheet, FlatList } from "react-native";
import { useFetchData } from "@/utils/fetchData";
import { useAppSelector, userSelector } from "@/stores";
import ParkingItem from "@/components/ParkingHistory/ParkingItem";
import { Log } from "@/utils/logger";

const ParkingHistory: FC<object> = () => {
  const [AllRecords, setAllRecords] = useImmer<PayOrder[] | null>(null);
  const { fetchData, API } = useFetchData();
  const { userId } = useAppSelector(userSelector);
  const refresh = useCallback(() => {
    !AllRecords && fetchData(
      API.reqGetPayRecords,
      [userId],
      (res) => {
        setAllRecords(res.data);
      },
      () => {
        setAllRecords([]);
        Log.Toast("获取停车记录失败", "LONG", "BOTTOM");
      }
    );
  }, [API.reqGetPayRecords, AllRecords, fetchData, setAllRecords, userId]);
  useEffect(() => {
    if (AllRecords === null) refresh();
  }, [AllRecords, refresh]);
  return (
    <>
      <Header title={"停车记录"} />
      <View style={ContainerStyle}>
        <FlatList
          data={AllRecords}
          renderItem={({ item }) => {
            return <ParkingItem key={item.orderId} order={item} />;
          }}
        />
      </View>
    </>
  );
};
export default memo(ParkingHistory) as typeof ParkingHistory;
const {
  ContainerStyle
} = StyleSheet.create({
  ContainerStyle: {
    paddingTop: 15
  }
} as const);
