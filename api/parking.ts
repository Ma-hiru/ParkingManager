import request from "@/utils/request";
import AppConf from "@/settings";

export const reqGetParkingList = (pageNum: number, pageSize: number, sortField?: "price" | "remainingSpaces", sortOrder?: "asc" | "desc", keyword?: string): Promise<ResponseData<{
  total: number;
  list: ParkingLot[]
}>> => {
  return request.get(AppConf.API.GetParkingList, {
    params: {
      pageNum,
      pageSize,
      sortField,
      keyword,
      sortOrder
    }
  });
};
