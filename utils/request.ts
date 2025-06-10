import axios from "axios";
import AppConf from "@/settings";
import { userActions, AppStore } from "@/stores";
import { Log } from "@/utils/logger";

const { setToken } = userActions;
const { dispatch } = AppStore;

/** axios实例 */
const request = axios.create({
  timeout: AppConf.RES_TIMEOUT
});
/** 请求拦截器 */
request.interceptors.request.use(config => {
  const { token } = AppStore.getState().userStore;
  config.headers.Authorization = AppConf.tokenPrefix + token;
  if (config.url) {
    if (!(config.url.startsWith("http")))
      config.url = new URL(config.url, AppConf.baseUrl).href;
  }
  return config;
});
/** 响应拦截器 */
request.interceptors.response.use(
  res => {
    const newToken = res.headers["x-auth-token"] || res.headers.authorization;
    if (newToken) dispatch(setToken(newToken));
    return res.data;
  },
  err => {
    Log.Echo({ err });
  }
);

export default request;



