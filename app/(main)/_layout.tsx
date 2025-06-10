import { Tabs } from "expo-router";
import { memo } from "react";
import { ImageStyle, Platform, Pressable, StyleProp, View } from "react-native";
import { Image, ImageSource } from "expo-image";
import Parking from "@/assets/tabs/parking.unselect.svg";
import ParkingActive from "@/assets/tabs/parking.select.svg";
import User from "@/assets/tabs/user.unselect.svg";
import UserActive from "@/assets/tabs/user.select.svg";
import AppConf from "@/settings";

const RenderIcon = (focused: boolean, defaultIcon: ImageSource | number, activeIcon: ImageSource | number, style?: StyleProp<ImageStyle>) => {
  return (
    focused ? <Image source={activeIcon} style={{
        width: 35,
        height: 35,
        position: "relative",
        bottom: 2,
        ...style as object
      }} /> :
      <Image source={defaultIcon} style={{
        width: 35,
        height: 35,
        position: "relative",
        bottom: 2,
        ...style as object
      }} />
  );
};
const MainLayout = () => {

  return (
    <>
      <Tabs
        backBehavior="firstRoute"
        screenOptions={{
          tabBarButton: (props) => (
            <View className="justify-center items-center w-full">
              <Pressable
                className="p-4"
                android_ripple={{
                  color: AppConf.Theme.routerTabBar.selectBgColor
                }}
                style={({ pressed }) => ({
                  opacity: pressed ? AppConf.Theme.routerTabBar.selectOpacity : 1,
                })}
                key={props.key}
                onPress={props.onPress}
              >
                {props.children}
              </Pressable>
            </View>
          ),
          tabBarLabelPosition: "below-icon",
          headerShown: false,
          tabBarActiveTintColor: "#000",
          headerShadowVisible: false,
          tabBarStyle: {
            backgroundColor: "#fff"
          },
          tabBarItemStyle: {
            overflow: "hidden",
            borderRadius: 12
          },
          animation:"shift",
        }}
      >
        <Tabs.Screen
          name="Parking"
          options={{
            tabBarIcon:
              ({ focused }) => RenderIcon(focused, Parking, ParkingActive),
            title: "停车"
          }}
        />
        <Tabs.Screen
          name="Panel"
          options={{
            tabBarIcon:
              ({ focused }) => RenderIcon(focused, User, UserActive, {
                width: 30,
                height: 30,
                position: "relative",
                bottom: 2
              }),
            title: "个人"
          }}
        />
      </Tabs>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(MainLayout);
