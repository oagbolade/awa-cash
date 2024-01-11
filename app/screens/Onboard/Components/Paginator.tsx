import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { layout, pallets } from 'constant';

interface PaginatorProps {
  index: number;
  translateX: Animated.SharedValue<number>;
}

const { width } = layout.window;

function Paginator({ index, translateX }: PaginatorProps): JSX.Element | null {
  const reanimatedStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0.25, 1, 0.25],
      Extrapolate.CLAMP,
    );

    const dotWidth = interpolate(translateX.value, inputRange, [0, 1], Extrapolate.CLAMP);

    return {
      opacity,
      width: dotWidth,
    };
  });
  return <Animated.View style={[styles.container, reanimatedStyle]} />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: pallets.dark,
    borderRadius: 4,
    height: 4,
    marginHorizontal: 4,
    width: 8,
  },
});

export default Paginator;
