import { FC, memo, useCallback, useEffect, useState } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Icon, LockIcon, MailIcon } from "@/components/ui/icon";
import { Divider } from "@/components/ui/divider";
import PressFeedback from "@/components/animate/PressFeedback";
import { useImmer } from "use-immer";

interface props {
  setFormType: (index: number) => void;
  formType: number;
}

const ChangeBtn: FC<props> = ({ setFormType, formType }) => {
  const [BtnState, setBtnState] = useImmer({
    Icon: LockIcon as typeof LockIcon,
    Text: "账号密码登录",
    Current: 0
  });
  useEffect(() => {
    switch (formType) {
      case 1:
        setBtnState((draft) => {
          draft.Icon = LockIcon;
          draft.Text = "账号密码登录";
          draft.Current = 1;
        });
        break;
      case 0:
        setBtnState((draft) => {
          draft.Icon = MailIcon;
          draft.Text = "邮箱登录";
          draft.Current = 0;
        });
        break;
    }
  }, [formType, setBtnState]);
  return (
    <>
      <View style={ContainerStyle}>
        <PressFeedback
          minScale={0.95}
          pressValue={BtnState.Current === 0 ? 1 : 0}
          onPressValue={setFormType}
        >
          <View style={IconStyle}>
            <Icon as={BtnState.Icon} size={"xl"} />
          </View>
          <Text style={TextStyle}>
            {BtnState.Text}
          </Text>
        </PressFeedback>
        <Divider style={{ margin: 5 }} />
        <Button variant={"link"} style={{ height: "auto" }} onPress={() => setFormType(2)}>
          <ButtonText style={{ fontSize: 12, fontWeight: "normal" }}>
            没有账号?
          </ButtonText>
        </Button>
      </View>
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
    bottom: windowHeight * 0.02
  },
  IconStyle: {
    marginBottom: 5,
    alignItems: "center"
  },
  TextStyle: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center"
  }
} as const);
