import { FC,memo } from "react";
import { Text, View } from "react-native";
type props = object;

const Panel: FC<props> = () => {
  return (
    <>
      <View className="flex-1 justify-center items-center">
        <Text>Panel</Text>
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Panel);
