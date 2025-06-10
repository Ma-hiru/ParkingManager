import AppConf from "@/settings";
import { AppStore } from "@/stores";

export const upload = <T>(url: string, formData: FormData): Promise<T> => {
  if (!url.startsWith("http")) url = AppConf.baseUrl + url;
  const { token } = AppStore.getState().userStore;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject("请求超时！");
    }, AppConf.RES_TIMEOUT);
    fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": AppConf.tokenPrefix + token
      }
    }).then((res) => {
      if (res.ok) {
        resolve(res.json());
      } else {
        reject(res.json());
      }
    }).catch((err) => {
      reject(err);
    }).finally(() => {
      clearTimeout(timer);
    });
  });
};
