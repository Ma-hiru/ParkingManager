import { FC } from "react";
import Header from "@/components/Header";
import { StyleSheet, View } from "react-native";
import { useGetRouteParam } from "@/hooks/useGetRouteParam";

type props = object;

const Detail: FC<props> = () => {
  const RouteParams = useGetRouteParam<DetailRouteParams>();
  return (
    <>
      <Header title={RouteParams.title} />
      <View style={ContainerStyle}></View>
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
