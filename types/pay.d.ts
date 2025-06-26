interface ParkingRecord {
  parkingLotName: string;
  inTime: string;
  outTime: string;
  totalPrice: number;
}

interface PayOrder extends ParkingRecord {
  paymentTime: string;
  orderId: number;
  paymentMethod: string;
  plateNumber: string;
  status: boolean;
}

interface PayStatus extends PayOrder{
  inTime: string;
  orderId: number;
  outTime: string;
  parkingLotName: string;
  paymentMethod: string;
  paymentTime: string;
  plateNumber: string;
  status: string;
  totalPrice: number;
}
