import { StyleSheet } from "react-native";


const styles = StyleSheet.create({});
const customStyle = {
  ThemeColor: "#1B6BFF",
  ThemeColorLight: "#4f8dff",
  WeatherIcon: {
    style: "fill",
    color: "white",
    defaultIcon: 100
  },
  routerTabBar: {
    selectBgColor: "rgba(0,0,0,0.2)",
    selectOpacity: 0.5
  },
  Parking: {
    InfoCardTotalHeight: 150,
    InfoCardSlideHeight: 90,
    InfoCardWidthPercent: "97%",
    InfoCardWidth: 97,
    InfoCardPadding: 10
  }
} as const;
export const Theme = {
  ...styles,
  ...customStyle
} as const;
