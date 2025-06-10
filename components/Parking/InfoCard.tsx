import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet, PanResponder, Animated } from "react-native";
import AppBtn from "@/components/AppBtn";
import { Image } from "expo-image";
import SearchIcon from "@/assets/Parking/search.svg";
import LineIcon from "@/assets/Parking/Line.svg";

type props = {
  slideEv?: (status: boolean) => void;
};
type ref = {
  openCard: () => void;
  closeCard: () => void;
};
const TotalHeight = 150;
const SlideHeight = 90;
const InfoCard: ForwardRefRenderFunction<ref, props> = ({ slideEv }, ref) => {
  const animatedPosition = useMemo(() => new Animated.Value(0), []);
  const [isCardOpen, setIsCardOpen] = useState(true);
  const positionRef = useRef(0);
  useEffect(() => {
    animatedPosition.addListener(({ value }) => {
      positionRef.current = value;
    });
    return () => {
      animatedPosition.removeAllListeners();
    };
  }, [animatedPosition]);
  const triggerSlideEv = useCallback(
    (status: boolean) => {
      if (isCardOpen === status) {
        return;
      } else {
        setIsCardOpen(status);
        slideEv && slideEv(status);
      }
    },
    [isCardOpen, slideEv]
  );
  const openCard = useCallback(() => {
    triggerSlideEv(true);
    Animated.timing(animatedPosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [animatedPosition, triggerSlideEv]);
  const closeCard = useCallback(() => {
    triggerSlideEv(false);
    Animated.timing(animatedPosition, {
      toValue: -SlideHeight,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [animatedPosition, triggerSlideEv]);
  const panResponder = useMemo(() => {
    // eslint-disable-next-line react-compiler/react-compiler
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      // 手势开始时记录初始位置
      onPanResponderGrant: () => {
        animatedPosition.setOffset(positionRef.current);
        animatedPosition.setValue(0);
      },
      // 手势移动时直接更新位置值
      onPanResponderMove: (_, { dy }) => {
        if (Math.abs(dy) > SlideHeight) {
          return;
        }
        animatedPosition.setValue(-dy);
      },
      // 手势释放时应用最终动画
      onPanResponderRelease: (_, gestureState) => {
        animatedPosition.flattenOffset();
        const { dy } = gestureState;
        const threshold = 20;
        if (dy > threshold) {
          closeCard();
        } else if (dy < -threshold) {
          openCard();
        }
      },
    });
  }, [animatedPosition, openCard, closeCard]);
  const animatedStyle = useMemo(
    () => ({
      transform: [
        {
          translateY: Animated.multiply(animatedPosition, -1),
        },
      ],
    }),
    [animatedPosition]
  );
  useImperativeHandle(ref, () => ({
    openCard,
    closeCard,
  }));
  return (
    <Animated.View style={[ContainerStyle, animatedStyle]} {...panResponder.panHandlers}>
      <Image source={LineIcon} style={LineIconStyle} />
      <View style={SearchStyle}>
        <AppBtn containerStyle={SearchBtnStyle} onPress={openCard}>
          <Image source={SearchIcon} style={SearchIconStyle} />
          <Text style={SearchTextStyle}>搜索停车场</Text>
        </AppBtn>
      </View>
      <View style={MainContainerStyle}>
        <AppBtn onPress={openCard}>open</AppBtn>
        <AppBtn onPress={closeCard}>close</AppBtn>
      </View>
    </Animated.View>
  );
};

export default forwardRef(InfoCard);

const {
  ContainerStyle,
  SearchStyle,
  SearchIconStyle,
  SearchTextStyle,
  SearchBtnStyle,
  MainContainerStyle,
  LineIconStyle,
} = StyleSheet.create({
  ContainerStyle: {
    position: "absolute",
    height: TotalHeight,
    width: "95%",
    padding: 10,
    left: "2.5%",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  SearchStyle: {
    height: 40,
    justifyContent: "center",
  },
  SearchBtnStyle: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  SearchIconStyle: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  SearchTextStyle: {
    color: "#fff",
  },
  MainContainerStyle: {
    flex: 1,
    paddingTop: 10,
  },
  LineIconStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    top: -35,
    left: "50%",
    transform: [{ translateX: -25 }],
  },
} as const);
