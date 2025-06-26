import RootState, { useAppSelector, userActions, userSelector } from "@/stores";
import { useCallback, useMemo } from "react";
import { usePages } from "@/hooks/usePages";


interface returnType {
  hasToken: boolean,
  handleLogout: () => void,
  handleLogin: (profile: UserProfile) => void,
}

const { setLogin, setLogout } = userActions;
const { dispatch } = RootState;
export const useLogin = (): returnType => {
  const { token } = useAppSelector(userSelector);
  const Pages = usePages();
  const handleLogout = useCallback(() => {
    dispatch(setLogout());
    Pages.set("/Login", "MOVE");
  }, [Pages]);
  const handleLogin = useCallback((profile: UserProfile) => {
    dispatch(setLogin(profile));
    Pages.set("/", "MOVE");
  }, [Pages]);
  return useMemo(() => ({
    hasToken: !!token,
    handleLogout,
    handleLogin
  }), [handleLogin, handleLogout, token]);
};
