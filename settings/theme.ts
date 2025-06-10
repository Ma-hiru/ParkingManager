import { StyleSheet } from "react-native";


const styles = StyleSheet.create({});
const customStyle = {
  ThemeColor: "#1B6BFF",
  WeatherIcon: {
    style: "fill",
    color: "white",
    defaultIcon: 100
  },
  routerTabBar: {
    selectBgColor: "rgba(0,0,0,0.2)",
    selectOpacity: 0.5
  }
} as const;
export const Theme = {
  ...styles,
  ...customStyle
} as const;
