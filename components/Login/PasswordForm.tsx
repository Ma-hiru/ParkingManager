import { FC, memo, useCallback } from "react";
import FormItem from "@/components/Login/FormItem";
import { StyleSheet, View } from "react-native";
import AppBtn from "@/components/AppBtn";
import { useImmer } from "use-immer";
import { useAppDispatch, userActions } from "@/stores";
import { usePages } from "@/hooks/usePages";
import { Log } from "@/utils/logger";
import { useFetchData } from "@/utils/fetchData";

const PasswordForm: FC<object> = () => {
  const [LoginParams, setLoginParams] = useImmer({
    username: "",
    usernameValid: true,
    usernameErrText: "",
    password: "",
    passwordValid: true,
    passwordErrText: ""
  });
  const { setLogin } = userActions;
  const dispatch = useAppDispatch();
  const Pages = usePages();
  const { fetchData, API } = useFetchData();
  const submit = useCallback(() => {
    if (!LoginParams.password.trim() && !LoginParams.username.trim()) {
      return Log.Toast("请输入用户名和密码", "SHORT", "BOTTOM");
    }
    fetchData(
      API.reqLoginPassword,
      [LoginParams],
      (res) => {
        console.log("res.data.userId=>",res.data.userId);
        dispatch(setLogin({
          ...res.data,
          avatar: res.data.profilePicture
        }));
        Pages.set("/Parking", "MOVE");
      },
      (res) => {
        Log.Toast(res?.message || "登录失败", "SHORT", "BOTTOM");
      }
    );
  }, [API.reqLoginPassword, LoginParams, Pages, dispatch, fetchData, setLogin]);
  return (
    <View style={ContainerStyle}>
      <FormItem
        type="text"
        value={LoginParams.username}
        onChangeText={(text) => setLoginParams(draft => {
          draft.username = text.trim();
        })}
        label={"用户名"}
        placeholder={"请输入用户名"}
        errorText={LoginParams.usernameErrText}
        valid={LoginParams.usernameValid}
        top={5}
      />
      <FormItem
        type="password"
        value={LoginParams.password}
        onChangeText={(text) => setLoginParams(draft => {
          draft.password = text.trim();
        })}
        label={"密码"}
        placeholder={"请输入密码"}
        errorText={LoginParams.passwordErrText}
        valid={LoginParams.passwordValid}
        top={5}
      />
      <View style={BtnContainerStyle}>
        <View style={BtnStyle}>
          <AppBtn minLoadingWidth={50} maxLoadingWidth={80} onPress={submit}>密码登录</AppBtn>
        </View>
      </View>
    </View>
  );
};
export default memo(PasswordForm);
const {
  BtnContainerStyle,
  BtnStyle,
  ContainerStyle
} = StyleSheet.create({
  ContainerStyle: {
    flex: 1,
    justifyContent: "center"
  },
  BtnContainerStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10
  },
  BtnStyle: {
    marginLeft: 10,
    width: "auto"
  }
} as const);
