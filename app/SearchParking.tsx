import { FC, memo, useCallback, useEffect, useState } from "react";
import Header from "@/components/Header";
import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import Filter from "@/components/SearchParking/Filter";
import { useImmer } from "use-immer";
import ListItem from "@/components/SearchParking/ListItem";
import SearchInput from "@/components/SearchParking/SearchInput";
import { useAppSelector } from "@/stores";
import { parkingSelector } from "@/stores/slice/parkingSlice";
import { usePages } from "@/hooks/usePages";
import { useFetchData } from "@/utils/fetchData";
import { computedPrice, computedSpaces } from "@/utils/computed";
import { Log } from "@/utils/logger";
import AppConf from "@/settings";


const SearchParking: FC<object> = () => {
  const Pages = usePages();
  const { parkingLotList } = useAppSelector(parkingSelector);
  const [SearchSort, setSearchSort] = useImmer(MenuData[0]);
  const [SearchKeywords, setSearchKeywords] = useState("");
  const [SearchResult, setSearchResult] = useImmer(parkingLotList);
  const renderResult = useCallback((data: ListRenderItemInfo<LotItem>) => {
    return <ListItem key={data.item.parkingLotId} parkingItem={data.item} onPress={() => {
      Pages.set({
        pathname: "/Detail",
        params: {
          title: data.item.parkingName,
          id: data.item.parkingLotId.toString(),
          index: data.index.toString()
        } satisfies DetailRouteParams
      }, "MOVE");
    }} />;
  }, [Pages]);
  const { fetchData, API } = useFetchData();
  useEffect(() => {
    fetchData(
      API.reqGetParkingList,
      [1, 9999, SearchSort.type, SearchSort.sort, SearchKeywords],
      (res) => {
        const computed = res.data.list.map((parking) => {
          return {
            ...parking,
            image: AppConf.baseUrl + "/api" + parking.image,
            spaces: computedSpaces(parking),
            price: computedPrice(parking)
          };
        });
        setSearchResult(computed);
      },
      (res) => {
        Log.Toast(res?.message || "获取停车场列表失败", "LONG", "BOTTOM");
      }
    );
  }, [API.reqGetParkingList, SearchKeywords, SearchSort.sort, SearchSort.type, fetchData, setSearchResult]);
  return (
    <View style={{ flex: 1, position: "relative", overflow: "hidden" }}>
      <Header title={"搜索停车场"} />
      <View style={ContainerStyle}>
        <SearchInput
          value={SearchKeywords}
          onChangeText={setSearchKeywords}
        />
        <FlatList
          data={SearchResult}
          renderItem={renderResult}
          extraData={[SearchSort, SearchKeywords]}
        />
      </View>
      <Filter
        menuData={MenuData}
        current={SearchSort}
        title={"筛选条件"}
        onSelect={setSearchSort}
      />
    </View>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(SearchParking);
const {
  ContainerStyle
} = StyleSheet.create({
  ContainerStyle: {
    flex: 1,
    backgroundColor: "#fff"
  }
} as const);
const MenuData: FilterMenu[] = [
  {
    title: "按价格升序",
    type: "price",
    sort: "asc"
  },
  {
    title: "按价格降序",
    type: "price",
    sort: "desc"
  },
  {
    title: "按车位升序",
    type: "remainingSpaces",
    sort: "asc"
  },
  {
    title: "按车位降序",
    type: "remainingSpaces",
    sort: "desc"
  }
];
