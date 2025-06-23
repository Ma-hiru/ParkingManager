import { FC, memo } from "react";
import { Text } from "react-native";

const ListItem: FC<object> = () => {
  return (
    <>
      <Text>搜索结果</Text>
    </>
  );
};
export default memo(ListItem);
