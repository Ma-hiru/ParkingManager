import { FC, useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, KeyboardAvoidingView, Platform, View } from "react-native";
import Logo from "@/components/Login/Logo";
import Form, { ref as LoginFormRef } from "@/components/Login/Form";
import Header from "@/components/Header";
import ChangeBtn from "@/components/Login/ChangeBtn";

const Login: FC<object> = () => {
  const FormRef = useRef<LoginFormRef>(null);
  const [formType, setFormType] = useState(0);
  const [Title, setTitle] = useState("");
  useEffect(() => {
    FormRef.current?.onPressPagination(formType);
    if (formType === 2) {
      setTitle("注册");
    } else {
      setTitle("登录");
    }
  }, [formType]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Header title={Title} back fill={false} />
      <View style={ContainerStyle}>
        <Logo formType={formType} />
        <Form width={windowWidth * 0.8}
              height={(formType === 0 || formType === 1) ? windowHeight * 0.27 : windowHeight * 0.40}
              ref={FormRef} />
        <ChangeBtn formType={formType} setFormType={setFormType} />
      </View>
    </KeyboardAvoidingView>
  );
};
// noinspection JSUnusedGlobalSymbols
export default Login;
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const {
  ContainerStyle
} = StyleSheet.create({
  ContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  }
} as const);
