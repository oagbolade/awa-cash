import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const xSmall = width < 325;
const small = width >= 325 && width < 350; //325 > width > 350
const medium = width >= 350 && width < 450;
const large = width >= 450;

/**
 * Layout Constants
 * - Layout constants are used to define the layout of the app
 * @property fonts: { largeTitle: 34, title1: 28, title2: 22, title3: 20, headline: 17, body: 17, callout: 16, subhead: 15, footnote: 13, caption1: 12, caption2: 11}
 * @property spacing: { padding: 20, xs: 4, s: 8, m: 16, r: 20, l: 24, xl: 32, xxl: 40 }
 * @property button: { height: 50, width: width * 0.65, radius1: 8, radius2: 50 / 2 }
 * @property input: { height: 50, borderWidth: 1.5 }
 * @property cards: {},
 * @property misc: {},
 * @property window: { height, width},
 */

export default {
  button: {
    height: 54,
    radius: 8,
    width: '65%',
  },
  cards: {
    cardHeight: 175,
    cardRadius: 8,
    cardWidth: width - 16 * 4,
    cardWidthMax: width - 16 * 2,
  },
  dimension: {
    isLandscape: height < width,
    isLargeDevice: large,
    isMediumDevice: medium,
    isPhone: width < 450,
    isPortrait: height > width,
    isSmallDevice: small,
    isSmallOrTiny: small || xSmall,
    isTablet: width >= 450,
    isTinyDevice: xSmall,
  },
  fonts: {
    //fonts
    body: xSmall ? 14 : small ? 15 : medium ? 16 : 17,
    callout: xSmall ? 13 : small ? 14 : medium ? 14 : 16,
    caption1: xSmall ? 11 : small ? 11 : 12,
    caption2: xSmall ? 11 : small ? 11 : 12,
    footnote: xSmall ? 12 : small ? 12 : 13,
    headline: xSmall ? 14 : small ? 15 : medium ? 16 : 17,
    largeTitle: xSmall ? 28 : small ? 30 : 34,
    subhead: xSmall ? 12 : small ? 13 : medium ? 14 : 15,
    title1: xSmall ? 22 : small ? 24 : 28,
    title2: xSmall ? 20 : small ? 20 : 22,
    title3: xSmall ? 18 : small ? 18 : 20,
  },
  input: {
    borderSize: 1,
    borderWidth: 1.5,
    height: 50,
    inputBottom: 15,
    inputRadius: 10,
  },
  misc: {
    avatar: 32,
    avatarLarge: 80,
    boxLayout: 80,
    icon: 24,
    pagination: 40,
    pill: 48,
    toastHeight: 100,
    width: 70,
  },
  numpad: {
    btnHeight: medium ? 55 : 50,
    inputHeight: 50,
  },
  spacing: {
    l: 24,
    m: 16,
    padding: small ? 14 : 16,
    r: 20,
    s: 8,
    xl: 32,
    xl2: 32 * 2,
    xs: 4,
    xxl: 40,
    xxl2: 40 * 2,
  },
  window: {
    height,
    width,
  },
};
