import { FC, memo, useCallback, useEffect } from "react";
import Header from "@/components/Header";
import { useImmer } from "use-immer";
import { View, StyleSheet, FlatList } from "react-native";
import { useFetchData } from "@/utils/fetchData";
import { useAppSelector, userSelector } from "@/stores";
import PayItem from "@/components/PayHistory/PayItem";
import { Log } from "@/utils/logger";

const PayHistory: FC<object> = () => {
  const [AllRecords, setAllRecords] = useImmer<PayOrder[] | null>(null);
  const { fetchData, API } = useFetchData();
  const { userId } = useAppSelector(userSelector);
  const refresh = useCallback(() => {
    fetchData(
      API.reqGetPayRecords,
      [userId],
      (res) => {
        setAllRecords(res.data);
      },
      () => {
        Log.Toast("获取订单记录失败", "LONG", "BOTTOM");
        setAllRecords([]);
      }
    );
  }, [API.reqGetPayRecords, fetchData, setAllRecords, userId]);
  useEffect(() => {
    refresh();
  }, [refresh]);
  return (
    <>
      <Header title={"订单记录"} />
      <View style={ContainerStyle}>
        <FlatList
          data={AllRecords}
          renderItem={({ item }) => {
            return <PayItem key={item.orderId} order={item} onClose={refresh} />;
          }}
        />
      </View>
    </>
  );
};
export default memo(PayHistory) as typeof PayHistory;
const {
  ContainerStyle
} = StyleSheet.create({
  ContainerStyle: {
    paddingTop: 15
  }
} as const);
