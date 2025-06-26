interface WebviewParkingInfo {
  name: string;
  address: string;
  price: string;
  longitude: number;
  latitude: number;
  spaces: number;
}

interface ParkingLot {
  address: string;
  areas: ParkingArea[];
  image: string;
  latitude: number;
  longitude: number;
  open: boolean;
  openingHours: string;
  parkingLotId: number;
  parkingName: string;
}

interface ParkingArea {
  areaName: string;
  parkingAreaId: number;
  price: number;
  remainingSpaces: number;
  spots: ParkingSpot[];
  totalSpaces: number;
}

interface ParkingSpot {
  occupied: boolean;
  parkingSpotId: number;
  vehicleLicensePlate: string;
}

interface LotItem extends ParkingLot {
  spaces: number;
  price: number;
}

interface WebViewDrive {
  lng: number;
  lat: number;
}

interface WebViewDriveStart extends WebViewDrive {
}
interface WebViewDriveEnd extends WebViewDrive {
}
