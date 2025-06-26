import {
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle, useState
} from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { useLocation } from "@/hooks/useLocation";
import { useImmer } from "use-immer";
import { useFetchData } from "@/utils/fetchData";
import { Log } from "@/utils/logger";
import { computedPrice, computedSpaces } from "@/utils/computed";
import { useAppDispatch, useAppSelector } from "@/stores";
import { parkingActions } from "@/stores/slice/parkingSlice";
import { InteractionManager } from "react-native";
import { posActions, posSelector } from "@/stores/slice/posSlice";

const Map: ForwardRefRenderFunction<Map.ref, Map.props> = ({ onSetCenter }, ref) => {
  /** state */
  const { CurLnt, CurLat, Lnt, Lat, Id } = useAppSelector(posSelector);
  const { setCur, setPos } = posActions;
  const webview = useRef<WebView>(null);
  const [ParkingLotList, setParkingLotList] = useImmer<ParkingLot[] | null>(null);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { setList, clearList, setMostSpaces } = parkingActions;
  /** methods */
  const { fetchData, API } = useFetchData();
  const sendMsg = useCallback((type: string, data: any) => {
    webview.current && webview.current.postMessage(JSON.stringify({
      type,
      data
    }));
  }, []);
  const setCenter = useCallback((lng: number, lat: number) => {
    sendMsg("setCenter", { longitude: lng, latitude: lat });
    onSetCenter && onSetCenter(lng, lat);
  }, [onSetCenter, sendMsg]);
  const refresh = useCallback(() => {
    fetchData(
      API.reqGetParkingList,
      [1, 9999],
      (res) => {
        setParkingLotList(res.data.list);
      },
      () => {
        Log.Toast("获取停车场失败，请检查网络", "LONG", "BOTTOM");
        setParkingLotList([]);
        dispatch(clearList());
      }
    );
  }, [API.reqGetParkingList, clearList, dispatch, fetchData, setParkingLotList]);
  const onMessage = useCallback((ev: WebViewMessageEvent) => {
    console.log(ev.nativeEvent.data);
  }, []);
  /* effect */
  useEffect(() => {
    const local = location.get().location;
    if (local) {
      setCenter(local.coords.longitude, local.coords.latitude);
      dispatch(setCur({
        CurLat: local.coords.latitude,
        CurLnt: local.coords.longitude
      }));
    }
  }, [dispatch, location, setCenter, setCur]);
  useEffect(() => {
    if (ParkingLotList === null) refresh();
  }, [ParkingLotList, refresh]);
  useEffect(() => {
    if (ParkingLotList) {
      InteractionManager.runAfterInteractions(() => {
        let mostSpaces = 0;
        let mostSpacesItem;
        let mostSpacesIndex = 0;
        const computed = ParkingLotList.map((parking, index) => {
          const spaces = computedSpaces(parking);
          if (spaces > mostSpaces) {
            mostSpaces = spaces;
            mostSpacesIndex = index;
          }
          const res = {
            ...parking,
            spaces,
            price: computedPrice(parking)
          };
          if (spaces === mostSpaces) mostSpacesItem = res;
          return res;
        });
        dispatch(setList(computed));
        dispatch(setMostSpaces({
          mostSpaces,
          mostSpacesItem,
          mostSpacesIndex
        }));
        sendMsg("setMarkers", computed.map((parking) => {
          return {
            name: parking.parkingName,
            latitude: parking.latitude,
            longitude: parking.longitude,
            address: parking.address,
            spaces: parking.spaces,
            price: parking.price.toString()
          };
        }) satisfies WebviewParkingInfo[]);
      });
    }
  }, [ParkingLotList, dispatch, sendMsg, setList, setMostSpaces]);
  /* ref */
  useImperativeHandle(ref, () => ({
    setCenter
  }));
  const setRoutes = useCallback((end: { lnt: number; lat: number; }) => {
    sendMsg("setRoutes", {
      start: {
        lng: CurLnt,
        lat: CurLat
      } satisfies WebViewDrive,
      end: {
        lng: end.lnt,
        lat: end.lat
      } satisfies WebViewDrive
    });
  }, [CurLat, CurLnt, sendMsg]);
  const [currentRouteId, setCurrentRouteId] = useState(-1);
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (currentRouteId !== Id && Lnt !== 0 && Lat !== 0) {
      timer = setTimeout(() => {
        console.log(Lnt, Lat, CurLat, CurLnt, Id);
        setRoutes({ lnt: Lnt, lat: Lat });
        setCurrentRouteId(Id);
        dispatch(setPos({
          Lnt: 0,
          Lat: 0,
          Id: 0
        }));
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [CurLat, CurLnt, Id, Lat, Lnt, currentRouteId, dispatch, setPos, setRoutes]);

  return (
    <>
      <WebView
        ref={webview}
        source={{ uri: "https://shiina-mahiru.cn/temp/map.html" }}
        style={{ flex: 1, padding: 0 }}
        onMessage={onMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={["*"]}
      />
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default forwardRef(Map);
