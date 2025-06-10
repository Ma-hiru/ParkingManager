import { AppStore, userActions } from "@/stores";

const { setLogout } = userActions;
const { dispatch } = AppStore;
export const logout = () => {
  dispatch(setLogout());
};
