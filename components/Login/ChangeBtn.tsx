import { FC, memo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Icon, LockIcon, MailIcon } from "@/components/ui/icon";
import PressFeedback from "@/components/animate/PressFeedback";

interface props {
  changeForm: () => void;
  formType: number;
}

const ChangeBtn: FC<props> = ({ changeForm, formType }) => {
  return (
    <>
      <PressFeedback containerStyle={ContainerStyle} minScale={0.95} onPress={changeForm}>
        <View style={IconStyle}>
          <Icon as={formType === 0 ? LockIcon : MailIcon} size={"xl"} />
        </View>
        <Text style={TextStyle}>
          {
            formType === 0 ?
              "账号密码登录" : "邮箱登录"
          }
        </Text>
      </PressFeedback>
    </>
  );
};
export default memo(ChangeBtn);
const { height: windowHeight } = Dimensions.get("window");
const {
  ContainerStyle,
  IconStyle,
  TextStyle
} = StyleSheet.create({
  ContainerStyle: {
    position: "absolute",
    bottom: windowHeight * 0.06
  },
  IconStyle: {
    marginBottom: 5,
    alignItems: "center"
  },
  TextStyle: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold"
  }
} as const);
