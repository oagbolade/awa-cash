import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { layout, pallets } from 'constant';

const { width } = layout.window;
const paginatorWidth = 8;

interface AnimPaginatorProps {
  index: number;
  translateX: Animated.SharedValue<number>;
}

function AnimPaginator({ index, translateX }: AnimPaginatorProps): JSX.Element | null {
  const reanimatedStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0.25, 1, 0.25],
      Extrapolate.CLAMP,
    );
    const scale = interpolate(translateX.value, inputRange, [1, 1, 1], Extrapolate.CLAMP);

    const dotWidth = interpolate(
      translateX.value,
      inputRange,
      [paginatorWidth, paginatorWidth * 2, paginatorWidth],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [{ scale }],
      width: dotWidth,
    };
  });
  return <Animated.View style={[styles.container, reanimatedStyle]} />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: pallets.text,
    borderRadius: paginatorWidth / 2,
    height: paginatorWidth / 2,
    marginHorizontal: 4,
    width: paginatorWidth,
  },
});

export default AnimPaginator;
