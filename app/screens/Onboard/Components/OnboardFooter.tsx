import { View } from 'react-native';

import { Button } from 'components';
import { layout } from 'constant';

interface OnboardFooterProps {
  onPress: () => void;
  last: boolean;
}

const { width } = layout.window;

export default function OnboardFooter({
  onPress,
  last,
}: OnboardFooterProps): JSX.Element | null {
  return (
    <View style={{ width }}>
      <Button label={last ? 'Get Started' : 'Next'} {...{ onPress }} width="90%" />
    </View>
  );
}
