import { FC, memo } from "react";
import { useReactive } from "ahooks";
import AppBtn from "@/components/AppBtn";
import { View } from "react-native";

type props = object;

const Form: FC<props> = () => {
  const LoginParams = useReactive({
    username: "",
    password: ""
  });
  return (
    <>
      <View>
        <AppBtn>登录</AppBtn>
      </View>
    </>
  );
};
export default memo(Form);
