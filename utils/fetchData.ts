import { useToast } from "@/components/ui/toast";
import { curryFirst } from "@/utils/curryFirst";
import { Log } from "@/utils/logger";
import { showNewToast } from "@/utils/toast";
import { API } from "@/api";
import { useCallback, useMemo } from "react";
import { usePages } from "@/hooks/usePages";
import { useAppDispatch, userActions } from "@/stores";


const _fetchData = async <T extends ResponseData<any>, P extends any[]>(
  toast: ReturnType<typeof useToast>,
  reqFn: (...args: P) => Promise<T>,
  reqData: P,
  successFn?: (res: T, createToast: RemoveFirstArg<typeof showNewToast>) => void,
  failFn?: (res: T, createToast: RemoveFirstArg<typeof showNewToast>) => void
) => {
  const ShowMessage = curryFirst(Log.Message, toast);
  try {
    const res = await reqFn(...reqData);
    console.log(res);
    if (res?.code === 401) {
      Log.Toast("登录过，请重新登录！", "LONG", "BOTTOM");
      return res.code;
    }
    if (res?.ok) {
      successFn && successFn(res, ShowMessage);
      return res.code;
    } else {
      failFn && failFn(res, ShowMessage);
      return res?.code || 201;
    }
  } catch (err) {
    Log.Echo({ err });
    Log.Toast("请求失败，请检查网络！", "LONG", "BOTTOM");
  }
};

export const useFetchData = () => {
  //  toast 并不是不变的！！！
  const toast = useToast();
  const Pages = usePages();
  const { setLogout } = userActions;
  const dispatch = useAppDispatch();
  const Logout = useCallback(() => {
    dispatch(setLogout());
    Pages.set("/", "MOVE");
  }, [Pages, dispatch, setLogout]);

  const fetchData = useCallback(async <T extends ResponseData<any>, P extends any[]>(
    reqFn: (...args: P) => Promise<T>,
    reqData: P,
    successFn?: (res: T, createToast: RemoveFirstArg<typeof showNewToast>) => void,
    failFn?: (res: T, createToast: RemoveFirstArg<typeof showNewToast>) => void,
    unauthorized?: (handleLogout: () => void) => void
  ) => {
    const curry = curryFirst(_fetchData, toast);
    const status = await curry(reqFn, reqData, successFn as any, failFn as any);
    if (status === 401) {
      if (unauthorized) {
        unauthorized(Logout);
      } else {
        Logout();
      }
    }
    return status;
    // eslint-disable-next-line
  }, [Logout]);

  return useMemo(() => ({ fetchData, API }), [fetchData]);
};
