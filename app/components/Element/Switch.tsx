import { Switch } from 'react-native';

import { pallets } from 'constant';

interface Props {
  enabled: boolean;
  onValueChange: (value: boolean) => void;
}

export default function AppSwitch({ enabled, onValueChange }: Props): JSX.Element | null {
  return (
    <Switch
      trackColor={{
        false: pallets.grey,
        true: `${pallets.primary}99`,
      }}
      thumbColor={enabled ? pallets.white : pallets.darkGrey}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onValueChange}
      value={enabled}
      style={{ transform: [{ scale: 0.65 }] }}
    />
  );
}
