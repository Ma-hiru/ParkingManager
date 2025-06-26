import { FC, memo, useCallback } from "react";
import { useImmer } from "use-immer";
import FormItem from "@/components/Login/FormItem";
import AppBtn from "@/components/AppBtn";
import { StyleSheet, View } from "react-native";
import { usePages } from "@/hooks/usePages";
import { useAppDispatch, userActions } from "@/stores";
import { Log } from "@/utils/logger";
import { useFetchData } from "@/utils/fetchData";

const EmailForm: FC<object> = () => {
  const [LoginParams, setLoginParams] = useImmer({
    email: "",
    emailValid: true,
    emailErrText: "",
    code: "",
    codeValid: true,
    codeErrText: ""
  });
  const Pages = usePages();
  const dispatch = useAppDispatch();
  const { setLogin } = userActions;
  const { fetchData, API } = useFetchData();
  const submit = useCallback(() => {
    if (!LoginParams.code.trim() || !LoginParams.email.trim()) {
      return Log.Toast("请填写完整信息", "LONG", "BOTTOM");
    }
    fetchData(
      API.reqLoginEmail,
      [LoginParams],
      (res) => {
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
  }, [API.reqLoginEmail, LoginParams, Pages, dispatch, fetchData, setLogin]);
  const sendCode = useCallback(() => {
    if (!LoginParams.email.trim()) {
      return Log.Toast("请填写邮箱", "SHORT", "BOTTOM");
    }
    fetchData(
      API.reqSendCode,
      [LoginParams.email],
      () => {
        Log.Toast("验证码已发送", "SHORT", "BOTTOM");
      },
      (res) => {
        Log.Toast(res?.message || "验证码发送失败", "SHORT", "BOTTOM");
      }
    );
  }, [API.reqSendCode, LoginParams.email, fetchData]);
  return (
    <View style={ContainerStyle}>
      <FormItem
        type="text"
        value={LoginParams.email}
        onChangeText={(text) => setLoginParams(draft => {
          draft.email = text.trim();
        })}
        label={"邮箱"}
        placeholder={"请输入邮箱"}
        errorText={LoginParams.emailErrText}
        valid={LoginParams.emailValid}
        top={5}
      />
      <FormItem
        type="text"
        value={LoginParams.code}
        onChangeText={(text) => setLoginParams(draft => {
          draft.code = text.trim();
        })}
        label={"验证码"}
        placeholder={"请输入验证码"}
        errorText={LoginParams.codeErrText}
        valid={LoginParams.codeValid}
        top={5}
      />
      <View style={BtnContainerStyle}>
        <View style={BtnStyle}>
          <AppBtn minLoadingWidth={50} maxLoadingWidth={100} onPress={sendCode}>发送验证码</AppBtn>
        </View>
        <View style={BtnStyle}>
          <AppBtn minLoadingWidth={50} maxLoadingWidth={80} onPress={submit}>邮箱登录</AppBtn>
        </View>
      </View>
    </View>
  );
};
export default memo(EmailForm);

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
