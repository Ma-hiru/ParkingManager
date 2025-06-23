import { FC, ReactNode, useRef, memo } from "react";
import { View, CustomAnimation } from "react-native-animatable";

import {
  GestureResponderEvent,
  Pressable,
  PressableStateCallbackType,
  StyleProp, ViewStyle
} from "react-native";


type props = {
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
  children?: ((
    e: PressableStateCallbackType,
    handlePressIn: (e: GestureResponderEvent) => void,
    handlePressOut: (e: GestureResponderEvent) => void
  ) => ReactNode) | ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  minScale?: number;
  maxScale?: number;
  className?: string;
};

const PressFeedback: FC<props> = (
  {
    onPress,
    children,
    containerStyle,
    minScale = 0.95,
    maxScale = 1,
    onLongPress,
    className
  }) => {
  const AniRef = useRef<View>(null);
  const customZoomOut: CustomAnimation = {
    easing: "ease-in-out",
    0: {
      transform: [{ scale: maxScale }]
    },
    1: {
      transform: [{ scale: minScale }]
    }
  };
  const customZoomIn: CustomAnimation = {
    easing: "ease-in-out",
    0: {
      transform: [{ scale: minScale }]
    },
    1: {
      transform: [{ scale: maxScale }]
    }
  };
  const handlePressIn = () => {
    const Ani = AniRef.current;
    if (Ani) {
      Ani.animate(customZoomOut, 50).then();
    }
  };
  const handlePressOut = () => {
    const Ani = AniRef.current;
    if (Ani) {
      Ani.animate(customZoomIn, 50).then();
    }
  };
  return (
    <>
      <View
        className={className}
        ref={AniRef}
        useNativeDriver={true}
        style={{
          backgroundColor: "transparent", ...containerStyle as object,
          transform: [{ scale: maxScale }]
        }}
      >
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onLongPress={onLongPress}
          style={{ backgroundColor: "transparent" }}
        >
          {
            e => <>{
              children && (typeof children === "function" ? children(e, handlePressIn, handlePressOut) : children)
            }</>
          }
        </Pressable>
      </View>
    </>
  );
};
export default memo(PressFeedback);
