import { AddRouterPermissionFunc } from "@/utils/goToPages";
import { Log } from "@/utils/logger";

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
  if (url === "/Login" satisfies typeof path) {
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
  return true;
};
