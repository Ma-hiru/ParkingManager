import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useRef
} from "react";
import { View, Text, StyleSheet } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import TotalInfo from "@/components/Parking/TotalInfo";
import SingleInfo from "@/components/Parking/SingleInfo";

interface props {
  width: number;
  height: number;
  data: [total: {}, detail: {}];
}

interface ref {
  onPressPagination: (index: number) => void;
}

const InfoContent: ForwardRefRenderFunction<ref, props> = ({ height, width, data }, ref) => {
  const CarouseRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const onPressPagination = useCallback((index: number) => {
    CarouseRef.current?.scrollTo({
      count: index - progress.value,
      animated: true
    });
  }, [progress]);
  useImperativeHandle(ref, () => ({
    onPressPagination
  }));
  return (
    <>
      <View style={ContainerStyle}>
        <Carousel
          ref={CarouseRef}
          loop={true}
          width={width}
          height={height}
          scrollAnimationDuration={500}
          data={data}
          onProgressChange={progress}
          renderItem={({ item, index }) => (
            index === 0 ? <TotalInfo /> : <SingleInfo />
          )} />
      </View>
    </>
  );
};
export default forwardRef(InfoContent);

const { ContainerStyle } = StyleSheet.create({
  ContainerStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  } as const
});
