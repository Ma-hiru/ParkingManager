import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useRef
} from "react";
import { View, PanResponder, StyleSheet } from "react-native";
import Carousel, { CarouselRenderItem, ICarouselInstance } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import EmailForm from "@/components/Login/EmailForm";
import PasswordForm from "@/components/Login/PasswordForm";
import RegisterForm from "@/components/Login/RegisterForm";

const Form: ForwardRefRenderFunction<ref, props> = ({ width, height }, ref) => {
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
      <View {...panResponder.panHandlers} style={ContainerStyle}>
        <Carousel
          ref={CarouseRef}
          loop={true}
          width={width}
          height={height}
          scrollAnimationDuration={500}
          data={data}
          onProgressChange={progress}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};
export default forwardRef(Form);

const { ContainerStyle } = StyleSheet.create({
  ContainerStyle: {
    justifyContent: "center",
    alignItems: "center"
  }
} as const);
const panResponder = PanResponder.create({
  onStartShouldSetPanResponder: () => true,
  onMoveShouldSetPanResponder: (_, { dx }) => {
    return Math.abs(dx) > 10;
  },
  onPanResponderMove: () => {
  }
});
const data = Array.from({ length: 3 });
const renderItem: CarouselRenderItem<unknown> = ({ index }) => {
  switch (index) {
    case 0:
      return <PasswordForm />;
    case 1:
      return <EmailForm />;
    case 2:
      return <RegisterForm />;
    default:
      return <></>;
  }
};


interface props {
  width: number;
  height: number;
}

export interface ref {
  onPressPagination: (index: number) => void;
}

