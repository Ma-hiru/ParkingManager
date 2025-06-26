import { FC, useCallback, useState } from "react";
import Header from "@/components/Header";
import OptionItem from "@/components/Settings/OptionItem";
import { ImageURISource, Text, View } from "react-native";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector, userActions, userSelector } from "@/stores";
import { usePages } from "@/hooks/usePages";
import { fileSystem } from "@/utils/fileSystem";
import AppBtn from "@/components/AppBtn";
import { useFetchData } from "@/utils/fetchData";
import { Log } from "@/utils/logger";

const Settings: FC<object> = () => {
  const { avatar, username, email } = useAppSelector(userSelector);
  const { setLogout } = userActions;
  const dispatch = useAppDispatch();
  const [newAvatar, setNewAvatar] = useState<ImageURISource | number | string>(avatar);
  const Pages = usePages();
  const pickAvatar = useCallback(async () => {
    await fileSystem.PickAvatar((res) => {
      setNewAvatar(res);
    });
  }, []);
  const { fetchData, API } = useFetchData();
  const { setLogin } = userActions;
  const save = useCallback(() => {
    if (newAvatar !== avatar) {
      fetchData(
        API.reqUpdateAvtar,
        [newAvatar as any],
        (res) => {
          dispatch(setLogin({
            ...res.data,
            avatar: res.data.profilePicture
          }));
          Log.Toast("保存成功", "LONG", "BOTTOM");
        },
        () => {
          Log.Toast("保存失败", "LONG", "BOTTOM");
        }
      );
    }
  }, [API.reqUpdateAvtar, avatar, dispatch, fetchData, newAvatar, setLogin]);
  return (
    <>
      <Header title={"设置"} />
      <View style={{ backgroundColor: "#fff", marginTop: 10 }}>
        <OptionItem title={"头像"} onPress={pickAvatar}>
          <Avatar size={"md"}>
            <AvatarFallbackText>{username}</AvatarFallbackText>
            <AvatarImage source={typeof newAvatar === "string" ? { uri: newAvatar } : newAvatar} />
          </Avatar>
        </OptionItem>
        <OptionItem title={"用户名"}>
          <Text>{username}</Text>
        </OptionItem>
      </View>
      <View style={{ backgroundColor: "#fff", marginTop: 10 }}>
        <OptionItem title={"修改密码"}></OptionItem>
        <OptionItem title={"修改邮箱"}>
          <Text>{email ? email : "未设定"}</Text>
        </OptionItem>
      </View>
      <View style={{ backgroundColor: "#fff", marginTop: 10 }}>
        <OptionItem title={"退出登录"} onPress={() => {
          dispatch(setLogout());
          Pages.set("/Parking", "MOVE");
        }}></OptionItem>
      </View>
      {
        newAvatar !== avatar &&
        <View style={{
          position: "absolute",
          bottom: 20,
          width: "80%",
          left: "10%"
        }}>
          <AppBtn onPress={save}>保存</AppBtn>
        </View>
      }
    </>
  );
};
export default Settings;
