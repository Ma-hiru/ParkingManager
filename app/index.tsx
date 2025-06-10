import { FC, memo } from "react";
import { Redirect } from "expo-router";

const Index: FC = () => {
  return <Redirect href={"/(main)/Parking"} />;
};
// noinspection JSUnusedGlobalSymbols
export default memo(Index);
