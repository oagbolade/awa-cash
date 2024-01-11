import { View } from 'react-native';

import { layout } from 'constant';
const { l, m, s, xs, xl, xxl, r, xl2, xxl2 } = layout.spacing;

interface Props {
  space?: 't' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xl2' | 'xxl2';
  horizontal?: boolean;
}
/**
 *
 * @param space t: 5, s: 10, m: 30, l: 40, xl: 50, xxl: 100
 * @returns 20
 */

export default function Divider({ space, horizontal = false }: Props): JSX.Element {
  let margin = 0;
  const styleProperty = horizontal ? 'marginLeft' : 'marginTop';

  switch (space) {
    case 't': {
      margin = xs;
      break;
    }
    case 's': {
      margin = s;
      break;
    }
    case 'm': {
      margin = m;
      break;
    }
    case 'l': {
      margin = l;
      break;
    }
    case 'xl': {
      margin = xl;
      break;
    }
    case 'xxl': {
      margin = xxl;
      break;
    }
    case 'xl2': {
      margin = xl2;
      break;
    }
    case 'xxl2': {
      margin = xxl2;
      break;
    }
    default: {
      margin = r;
      break;
    }
  }

  return <View style={{ [styleProperty]: margin }} />;
}
