import { FC, memo, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import UserAvatar from "@/components/Panel/UserAvatar";
import { useNavigation } from "expo-router";
import AppConf from "@/settings";
import { usePages } from "@/hooks/usePages";
import defaultAvatar from "@/assets/Panel/defaultAvatar.png";
import { useLogin } from "@/hooks/useLogin";
import { useAppDispatch, useAppSelector, userSelector } from "@/stores";
import { useFetchData } from "@/utils/fetchData";
import dayjs from "dayjs";

const UserInfo: FC<object> = () => {
  useNavigation();
  const Pages = usePages();
  const { hasToken } = useLogin();
  const { avatar, username, userId } = useAppSelector(userSelector);
  const [totalTime, setTotalTime] = useState("");
  const { fetchData, API } = useFetchData();
  useEffect(() => {
    if (!totalTime) {
      fetchData(
        API.reqGetPayRecords,
        [userId],
        (res) => {
          let total = 0;
          res.data.forEach((order) => {
            const duration = dayjs(order.outTime).diff(order.inTime, "minute");
            total += duration;
          });
          setTotalTime(total.toString() + "分");
        },
        () => {
          setTotalTime(" - ");
        }
      );
    }
  }, [API.reqGetPayRecords, fetchData, totalTime, userId]);
  return (
    <View style={AvatarStyle}>
      <UserAvatar
        uri={(hasToken && avatar) ? avatar : defaultAvatar}
        name={hasToken ? username : "请登录"}
        onPress={Pages.set("/Settings", "FN")}
        BadgeColor={hasToken ? AppConf.Theme.ThemeColor : "red"}
      >
        {
          hasToken &&
          <Text>
            停车总时长 <Text style={InfoTextStyle}>{totalTime}</Text>
          </Text>
        }
      </UserAvatar>
    </View>
  );
};
export default memo(UserInfo);

const {
  AvatarStyle,
  InfoTextStyle
} = StyleSheet.create({
  AvatarStyle: {
    backgroundColor: "#ffffff",
    paddingTop: 90,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20
  },
  InfoTextStyle: {
    color: AppConf.Theme.ThemeColor
  }
} as const);
