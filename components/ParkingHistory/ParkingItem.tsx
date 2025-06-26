import { FC, memo } from "react";
import { Card } from "@/components/ui/card";
import { View, Text, StyleSheet } from "react-native";
import SendPayment from "@/components/Pay/SendPayment";
import dayjs from "dayjs";
import { Divider } from "@/components/ui/divider";

const ParkingItem: FC<props> = ({ order }) => {
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
      </Card>
    </>
  );
};
export default memo(ParkingItem) as typeof ParkingItem;

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
    height: 60,
    marginBottom: 10
  }
} as const);

interface props {
  order: PayOrder;
}
