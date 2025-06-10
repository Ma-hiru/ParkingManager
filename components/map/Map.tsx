import {
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  ForwardRefRenderFunction, useImperativeHandle
} from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { useLocation } from "@/hooks/useLocation";




const Map: ForwardRefRenderFunction<Map.ref, Map.props> = ({ onSetCenter }, ref) => {
  const webview = useRef<WebView>(null);
  const location = useLocation();
  const setCenter = useCallback((lng: number, lat: number) => {
    webview.current && webview.current.postMessage(JSON.stringify({
      type: "setCenter",
      data: {
        longitude: lng,
        latitude: lat
      }
    }));
    onSetCenter && onSetCenter(lng, lat);
  }, [onSetCenter]);
  useEffect(() => {
    const local = location.get().location;
    if (local) setCenter(local.coords.longitude, local.coords.latitude);
  }, [location, setCenter]);
  const onMessage = useCallback((ev: WebViewMessageEvent) => {
    console.log(ev.nativeEvent.data);
  }, []);
  useImperativeHandle(ref, () => ({
    setCenter
  }));
  return (
    <>
      <WebView
        ref={webview}
        source={require("@/map/map.html")} style={{ flex: 1,padding:0 }}
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
