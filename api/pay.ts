import request from "@/utils/request";
import AppConf from "@/settings";

export const reqGetPayCode = async (orderId: number): Promise<ResponseData<string>> => {
  try {
    const res: string = await request.post(`${AppConf.API.GetPayCode}?orderId=${orderId}`) as any;
    if (res) {
      return Promise.resolve({
        data: res,
        code: 200,
        message: "success",
        ok: true
      });
    }
    return Promise.resolve({
      data: "",
      code: 201,
      message: "",
      ok: false
    });

  } catch {
    return Promise.reject({
      data: null,
      code: 500,
      message: "服务器错误",
      ok: false
    });
  }
};
export const reqGetPayStatus = (orderId: string | number): Promise<ResponseData<PayStatus>> => {
  return request.get(`${AppConf.API.GetPayStatus}/${orderId}`);
};
export const reqGetPayRecords = (userId: number): Promise<ResponseData<PayOrder[]>> => {
  return request.get(`${AppConf.API.GetPayRecords}${userId}`);
};
