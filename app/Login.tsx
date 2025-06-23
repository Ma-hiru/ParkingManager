import { FC, useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, Dimensions, StyleSheet } from "react-native";
import Logo from "@/components/Login/Logo";
import Form, { ref as LoginFormRef } from "@/components/Login/Form";
import Header from "@/components/Header";
import ChangeBtn from "@/components/Login/ChangeBtn";

type props = object;

const Login: FC<props> = () => {
  const FormRef = useRef<LoginFormRef>(null);
  const [formType, setFormType] = useState(0);
  useEffect(() => {
    FormRef.current?.onPressPagination(formType);
  }, [formType]);
  const changeForm = useCallback(() => {
    if (formType === 0) {
      setFormType(1);
    } else {
      setFormType(0);
    }
  }, [formType]);
  return (
    <>
      <Header title={"登录"} back />
      <SafeAreaView style={ContainerStyle}>
        <Logo formType={formType} />
        <Form width={windowWidth * 0.8} height={windowHeight * 0.27} ref={FormRef} />
        <ChangeBtn formType={formType} changeForm={changeForm} />
      </SafeAreaView>
    </>
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
