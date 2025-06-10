namespace Map {
  export type props = {
    onSetCenter?: (lng: number, lat: number) => void;
  };
  export type ref = {
    setCenter: (lng: number, lat: number) => void;
  }
}
