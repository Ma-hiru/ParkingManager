import { FC, memo, useCallback, useState } from "react";
import { Link } from "@/components/ui/link";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useFetchData } from "@/utils/fetchData";
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerBody
} from "@/components/ui/drawer";
import AppConf from "@/settings";
import { Image } from "expo-image";
import countIcon from "@/assets/Pay/count.svg";
import alipayIcon from "@/assets/Pay/alipay.svg";
import { Log } from "@/utils/logger";
import { Button, ButtonText } from "@/components/ui/button";

const SendPayment: FC<props> = ({ orderId, onClose }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [qrcode, setQrcode] = useState("");
  const { fetchData, API } = useFetchData();
  const getCode = useCallback(() => {
    fetchData(
      API.reqGetPayCode,
      [orderId],
      (res) => {
        setQrcode(res.data);
        setShowDrawer(true);
      },
      () => {
        Log.Toast("获取支付码失败，请检查网络", "LONG", "BOTTOM");
        setQrcode("获取支付码失败，请检查网络");
        setShowDrawer(true);
      }
    );
  }, [API.reqGetPayCode, fetchData, orderId]);
  const payByCount = useCallback(() => {
    Log.Toast("暂不支持余额支付", "LONG", "BOTTOM");
  }, []);
  return (
    <>
      <Button action={"negative"} onPress={getCode} size={"xs"}
              style={{ width: 65 }}>
        <ButtonText style={{ fontSize: 12 }}>支付</ButtonText>
      </Button>
      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false);
          onClose &&　onClose();
        }}
        size="sm"
        anchor="bottom"
      >
        <DrawerBackdrop />
        <DrawerContent>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingBottom: 0,
            marginBottom: 0,
            position: "relative",
            height: 180
          }}>
            <Pressable
              android_ripple={{
                color: "rgba(0, 0, 0, 0.2)",
                borderless: false,
                radius: 300
              }}
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={payByCount}
            >
              <Image source={countIcon} contentFit={"cover"} style={{ width: 40, height: 40 }} />
              <Text style={{
                fontSize: 15,
                fontWeight: "bold",
                marginTop: 5,
                color: AppConf.Theme.ThemeColor
              }}>余额支付</Text>
            </Pressable>
            <Pressable
              android_ripple={{
                color: "rgba(0, 0, 0, 0.2)",
                borderless: false,
                radius: 300
              }}
            >
              <Link href={`alipays://platformapi/startapp?saId=10000007&qrcode=${qrcode}`}
                    style={{ justifyContent: "center", alignItems: "center" }}>
                <Image source={alipayIcon} contentFit={"cover"}
                       style={{ width: 42, height: 42 }} />
                <Text style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginTop: 5,
                  color: AppConf.Theme.ThemeColor
                }}>支付宝</Text>
              </Link>
            </Pressable>
          </View>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default memo(SendPayment) as typeof SendPayment;

const {
  TextStyle
} = StyleSheet.create({
  TextStyle: {
    fontSize: 14
  }
} as const);

interface props {
  orderId: number;
  onClose?: () => void;
}
