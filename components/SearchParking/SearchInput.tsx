import { FC, memo } from "react";
import { Input, InputField } from "@/components/ui/input";
import { Dimensions, StyleSheet, View } from "react-native";
import AppBtn from "@/components/AppBtn";


interface props {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchInput: FC<props> = ({ value, onChangeText }) => {
  return (
    <>
      <View style={ContainerStyle}>
        <Input
          variant="outline"
          size={"lg"}
          style={{ width: InputWidth }}
        >
          <InputField
            placeholder={"输入关键词"}
            onChangeText={onChangeText}
            value={value}
          />
        </Input>
        <View style={SearchBtnStyle}>
          <AppBtn>搜索</AppBtn>
        </View>
      </View>
    </>
  );
};
export default memo(SearchInput);
const screenWidth = Dimensions.get("window").width;
const SearchBtnWidth = 50;
const InputWidth = screenWidth - 30 - SearchBtnWidth;
const {
  ContainerStyle,
  SearchBtnStyle
} = StyleSheet.create({
  ContainerStyle: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  SearchBtnStyle: {
    width: SearchBtnWidth
  }
} as const);
