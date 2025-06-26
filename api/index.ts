import * as parking from "./parking";
import * as pay from "./pay";
import * as user from "./user";

export const API = {
  ...pay,
  ...parking,
  ...user
};
