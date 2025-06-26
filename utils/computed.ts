export const computedSpaces = (parking: ParkingLot) => {
  return parking.areas.reduce((acc, area) => {
    console.log(area.remainingSpaces);
    return acc + area.remainingSpaces;
  }, 0);
};
export const computedPrice = (parking: ParkingLot) => {
  return parking.areas.reduce((acc, area) => {
    return acc + area.price;
  }, 0) / parking.areas.length;
};
