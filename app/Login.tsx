import { FC } from "react";
import { StatusBar,Text, SafeAreaView } from "react-native";
import { usePages } from "@/hooks/usePages";
import Logo from "@/components/Login/Logo";
import Form from "@/components/Login/Form";
import Header from "@/components/Header";

type props = object;

const Login: FC<props> = () => {
  const Pages = usePages();
  return (
    <>
      <Header title={"登录"} back />
      <Text>Login</Text>
      <SafeAreaView className="flex-1 justify-center items-center">
        <Logo />
        <Form />
      </SafeAreaView>
    </>
  );
};
export default Login;
