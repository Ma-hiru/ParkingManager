namespace Map {
  export type props = {
    onSetCenter?: (lng: number, lat: number) => void;
  };
  export type ref = {
    setCenter: (lng: number, lat: number) => void;
  }
}
namespace InfoCard {
  export type ref = {
    openCard: () => void;
    closeCard: () => void;
  }
}
namespace InfoContent {
  export type ref = {
    onPressPagination: (index: number) => void;
  }
}
namespace LoginForm {
  export type ref = {
    onPressPagination: (index: number) => void;
  }
}
