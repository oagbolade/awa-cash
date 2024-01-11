import { Image, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { onboardData } from './Data';
import { OnboardFooter, Paginator } from './Components';

import { Divider, SwirlBackground, Text } from 'components';
import { layout, pallets } from 'constant';
import { setOnboarded, useDispatch } from 'store';

const { window, spacing, fonts } = layout;

export default function Onboard(): JSX.Element {
  const aref = useAnimatedRef<Animated.ScrollView>();
  const translateX = useSharedValue(0);
  const dispatch = useDispatch();

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  const reanimatedFooterStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -translateX.value }],
    };
  });

  return (
    <SwirlBackground>
      <View>
        <Animated.ScrollView
          ref={aref}
          horizontal
          snapToInterval={window.width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={scrollHandler}
          scrollEventThrottle={1}>
          {onboardData.map((slide, index) => {
            return (
              <View style={styles.page} key={index}>
                <View style={{ padding: spacing.padding }}>
                  <Image source={slide.image} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                  <Divider />
                  <Text
                    textAlign="center"
                    variant="bold-700"
                    color={pallets.black}
                    size={fonts.title3}>
                    {slide.title}
                  </Text>
                  <Divider />
                  <View
                    style={{
                      alignSelf: 'center',
                      width: window.width * 0.7,
                    }}>
                    <Text color={pallets.black} size={fonts.subhead} textAlign="center">
                      {slide.description}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </Animated.ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardData.map((_, index) => (
            <Paginator key={index} {...{ index, translateX }} />
          ))}
        </View>
        <Animated.View
          style={[
            {
              flexDirection: 'row',
              width: window.width * onboardData.length,
            },
            reanimatedFooterStyle,
          ]}>
          {onboardData.map((_, index) => {
            const last = index === onboardData.length - 1;

            return (
              <OnboardFooter
                key={index}
                last={last}
                onPress={() => {
                  if (last) {
                    dispatch(setOnboarded(true));
                  } else {
                    aref.current?.scrollTo({
                      animated: true,
                      x: window.width * (index + 1),
                    });
                  }
                }}
              />
            );
          })}
        </Animated.View>
        <Divider />
      </View>
    </SwirlBackground>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: pallets.white,
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: window.width * 0.9,
    width: undefined,
  },
  page: {
    width: window.width,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: pallets.white,
    // borderTopLeftRadius: spacing.m,
    // borderTopRightRadius: spacing.m,
    paddingHorizontal: 20,
  },
});
