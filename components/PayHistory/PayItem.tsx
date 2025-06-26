import { FC, memo } from "react";
import { Card } from "@/components/ui/card";
import { View, Text, StyleSheet } from "react-native";
import SendPayment from "@/components/Pay/SendPayment";
import dayjs from "dayjs";
import { Divider } from "@/components/ui/divider";

const PayItem: FC<props> = ({ order, onClose }) => {
  return (
    <>
      <Card style={CardStyle}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{order.parkingLotName}</Text>
        <View>
          <Text style={{ textAlign: "center", fontSize: 12 }}>
            时长：{dayjs(order.outTime).diff(order.inTime, "minute")}min
          </Text>
          <Text style={{ textAlign: "center", fontSize: 12 }}>
            {order.plateNumber}
          </Text>
        </View>
        <View style={{ flexDirection: "row", height: 30, alignItems: "center" }}>
          <Text style={{
            textAlign: "right",
            fontWeight: "bold",
            fontSize: 16,
            marginBottom: 5
          }}>
            {order.totalPrice}￥
          </Text>
          <Divider orientation={"vertical"} style={{ marginLeft: 5, marginRight: 5 }} />
          {
            order.status ? <Text style={{
                color: "green",
                fontSize: 12,
                width: 65,
                textAlign: "center"
              }}>已支付</Text> :
              <SendPayment orderId={order.orderId} onClose={onClose} />
          }
        </View>
      </Card>
    </>
  );
};
export default memo(PayItem) as typeof PayItem;

const {
  CardStyle
} = StyleSheet.create({
  CardStyle: {
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    marginBottom: 10
  }
} as const);

interface props {
  order: PayOrder;
  onClose?: () => void;
}
