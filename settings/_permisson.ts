import { AddRouterPermissionFunc } from "@/utils/goToPages";
import { Log } from "@/utils/logger";
import RootState from "@/stores";

AddRouterPermissionFunc((path, push) => {
  let url: string;
  switch (typeof path) {
    case "string":
      url = path;
      break;
    case "object":
      url = path.pathname as string;
      break;
  }
  if (
    url === "/Login"  satisfies typeof path ||
    url === "/About"  satisfies typeof path ||
    url === "/Parking"  satisfies typeof path
  ) {
    return true;
  } else {
    const ok = hasLogin();
    if (!ok) {
      Log.Toast("请先登录", "SHORT", "BOTTOM");
      push("/Login");
    }
    return ok;
  }
});

const hasLogin = () => {
  const { token } = RootState.getState().userStore;
  return !!token;
};
