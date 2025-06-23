import { FC, memo } from "react";
import { useImmer } from "use-immer";
import FormItem from "@/components/Login/FormItem";
import AppBtn from "@/components/AppBtn";
import { StyleSheet, View } from "react-native";

const EmailForm: FC<object> = () => {
  const [LoginParams, setLoginParams] = useImmer({
    email: "",
    emailValid: true,
    emailErrText: "",
    code: "",
    codeValid: true,
    codeErrText: ""
  });
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
          <AppBtn minLoadingWidth={50} maxLoadingWidth={100}>发送验证码</AppBtn>
        </View>
        <View style={BtnStyle}>
          <AppBtn minLoadingWidth={50} maxLoadingWidth={80}>邮箱登录</AppBtn>
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
