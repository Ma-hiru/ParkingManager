/** baseURL */
export const DEFAULT_BASE_URL = "https://renmen321.cn:8080";
export const baseUrl = DEFAULT_BASE_URL;

export enum tokenTypePrefix {
  /** Basic */
  Basic = "Basic ",
  /** Bearer */
  Bearer = "Bearer ",
  /** NonePrefix */
  None = ""
}

export const tokenPrefix = tokenTypePrefix.None;

export const enum API {
  /** User */
  PasswordLogin = "/api/user/loginByUsername",
  EmailLogin = "/api/user/loginByEmail",
  SendCode = "/api/user/sendCode",
  Register = "/api/user/register",
  UpdateAvatar = "/api/user/update",

/* Pay */
GetPayCode = "/api/order/payByAlipay",
  GetPayStatus = "/api/order/",
  GetPayRecords = "/api/order/user/",
  /* Parking */
  GetParkingList = "/api/parkingQuery/pageLotAll",
}
