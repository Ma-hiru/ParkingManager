import { FC, memo, useCallback } from "react";
import FormItem from "@/components/Login/FormItem";
import { StyleSheet, View } from "react-native";
import AppBtn from "@/components/AppBtn";
import { useImmer } from "use-immer";
import { useFetchData } from "@/utils/fetchData";
import { Log } from "@/utils/logger";

const RegisterForm: FC<object> = () => {
  const [RegisterParams, setRegisterParams] = useImmer({
    username: "",
    usernameValid: true,
    usernameErrText: "",
    password: "",
    passwordValid: true,
    passwordErrText: "",
    email: "",
    emailValid: true,
    emailErrText: "",
    code: "",
    codeValid: true,
    codeErrText: ""
  });
  const { fetchData, API } = useFetchData();
  const sendCode = useCallback(() => {
    if (!RegisterParams.email.trim()) {
      return Log.Toast("请填写邮箱", "SHORT", "BOTTOM");
    }
    fetchData(
      API.reqSendCode,
      [RegisterParams.email],
      () => {
        Log.Toast("验证码已发送", "SHORT", "BOTTOM");
      },
      (res) => {
        Log.Toast(res?.message || "验证码发送失败", "SHORT", "BOTTOM");
      }
    );
  }, [API.reqSendCode, RegisterParams.email, fetchData]);
  const submit = useCallback(() => {
    if (!RegisterParams.code.trim() || !RegisterParams.email.trim() || !RegisterParams.password.trim() || !RegisterParams.username.trim()) {
      return Log.Toast("请填写完整信息", "LONG", "BOTTOM");
    }
    fetchData(
      API.reqRegister,
      [RegisterParams],
      () => {
        Log.Toast("注册成功", "SHORT", "BOTTOM");
        setRegisterParams({
          code: "",
          codeErrText: "",
          codeValid: false,
          email: "",
          emailErrText: "",
          emailValid: false,
          password: "",
          passwordErrText: "",
          passwordValid: false,
          username: "",
          usernameErrText: "",
          usernameValid: false

        });
      },
      (res) => {
        Log.Toast(res?.message || "注册失败", "SHORT", "BOTTOM");
      }
    );
  }, [API.reqRegister, RegisterParams, fetchData, setRegisterParams]);
  return (
    <View style={ContainerStyle}>
      <FormItem
        type="text"
        value={RegisterParams.username}
        onChangeText={(text) => setRegisterParams(draft => {
          draft.username = text.trim();
        })}
        label={"用户名"}
        placeholder={"请输入用户名"}
        errorText={RegisterParams.usernameErrText}
        valid={RegisterParams.usernameValid}
        top={5}
      />
      <FormItem
        type="password"
        value={RegisterParams.password}
        onChangeText={(text) => setRegisterParams(draft => {
          draft.password = text.trim();
        })}
        label={"密码"}
        placeholder={"请输入密码"}
        errorText={RegisterParams.passwordErrText}
        valid={RegisterParams.passwordValid}
        top={5}
      />
      <FormItem
        type="text"
        value={RegisterParams.email}
        onChangeText={(text) => setRegisterParams(draft => {
          draft.email = text.trim();
        })}
        label={"邮箱"}
        placeholder={"请输入邮箱"}
        errorText={RegisterParams.emailErrText}
        valid={RegisterParams.emailValid}
        top={5}
      />
      <FormItem
        type="text"
        value={RegisterParams.code}
        onChangeText={(text) => setRegisterParams(draft => {
          draft.code = text.trim();
        })}
        label={"验证码"}
        placeholder={"请输入验证码"}
        errorText={RegisterParams.codeErrText}
        valid={RegisterParams.codeValid}
        top={5}
      />
      <View style={BtnContainerStyle}>
        <View style={BtnStyle}>
          <AppBtn minLoadingWidth={50} maxLoadingWidth={100} onPress={sendCode}>发送验证码</AppBtn>
        </View>
        <View style={BtnStyle}>
          <AppBtn minLoadingWidth={50} maxLoadingWidth={80} onPress={submit}>注册</AppBtn>
        </View>
      </View>
    </View>
  );
};
export default memo(RegisterForm);

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
