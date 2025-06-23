import { FC, memo, useCallback, useState } from "react";
import Header from "@/components/Header";
import { ListRenderItemInfo, StyleSheet, View, FlatList } from "react-native";
import Filter from "@/components/SearchParking/Filter";
import { useImmer } from "use-immer";
import ListItem from "@/components/SearchParking/ListItem";
import SearchInput from "@/components/SearchParking/SearchInput";


const SearchParking: FC<object> = () => {
  const [SearchSort, setSearchSort] = useImmer(MenuData[0]);
  const [SearchKeywords, setSearchKeywords] = useState("");
  const [SearchResult, setSearchResult] = useImmer(Array.from({ length: 120 }));
  const renderResult = useCallback(({ index }: ListRenderItemInfo<unknown>) => {
    return <ListItem key={index} />;
  }, []);
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
    flex: 1
  }
} as const);
const MenuData: FilterMenu[] = [
  {
    title: "综合推荐",
    type: "total",
    sort: "desc"
  },
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
    title: "按距离升序",
    type: "distance",
    sort: "asc"
  },
  {
    title: "按距离降序",
    type: "distance",
    sort: "desc"
  }
];
