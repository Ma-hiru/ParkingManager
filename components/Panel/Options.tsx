import { FC, memo } from "react";
import { StyleSheet, View } from "react-native";
import OptionItem from "@/components/Panel/OptionItem";
import SettingsIcon from "@/assets/Panel/settings.svg";
import MessageIcon from "@/assets/Panel/message.svg";
import ParkingIcon from "@/assets/Panel/parking.svg";
import MoneyIcon from "@/assets/Panel/money.svg";
import WalletIcon from "@/assets/Panel/wallet.svg";
import AboutIcon from "@/assets/Panel/about.svg";
import { usePages } from "@/hooks/usePages";

const Options: FC<object> = () => {
  const Pages = usePages();
  return (
    <View style={ContainerStyle}>
      <View style={{ backgroundColor: "#fff", marginTop: 10 }}>
        <OptionItem
          icon={MoneyIcon}
          title={"订单记录"}
          onPress={Pages.set("/PayHistory", "FN")}
        />
        <OptionItem
          icon={ParkingIcon}
          title={"停车记录"}
          onPress={Pages.set("/ParkingHistory", "FN")}
        />
        <OptionItem
          icon={WalletIcon}
          title={"我的钱包"}
          showDivider={false}
          onPress={Pages.set("/Wallet", "FN")}
        />
      </View>
      <View style={{ backgroundColor: "#fff", marginTop: 10 }}>
        <OptionItem
          icon={MessageIcon}
          title={"反馈帮助"}
          showDivider={false}
          onPress={Pages.set("/Feedback", "FN")}
        />
        <OptionItem
          icon={SettingsIcon}
          title={"账户设置"}
          onPress={Pages.set("/Settings", "FN")}
        />
        <OptionItem
          icon={AboutIcon}
          title={"关于程序"}
          onPress={Pages.set("/About", "FN")}
        />
      </View>
    </View>
  );
};
export default memo(Options);

const {
  ContainerStyle
} = StyleSheet.create({
  ContainerStyle: {}
} as const);
