import { Alert, FlatList } from 'react-native';

import { kycSection } from './Data';
import { ProcessCard } from './Components';

import { KYCRoutes, StackNavigationProps } from 'navigation';
import { AltHeader, Container, VirtualScroll } from 'components';
import { setBiometric, useDispatch, useSelector } from 'store';

export default function AccountSetup({
  navigation,
}: StackNavigationProps<KYCRoutes, 'AccountSetup'>): JSX.Element {
  const { accountSetUp } = useSelector(state => state.auth);
  const { biometrics } = useSelector(state => state.persisted);
  const dispatch = useDispatch();

  return (
    <>
      <AltHeader iconColor="white" label="Account Set Up" />
      <VirtualScroll>
        <Container backgroundColor="white">
          <FlatList
            data={kycSection}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <ProcessCard
                  onPress={() => {
                    if (item.route) {
                      navigation.navigate(item.route);
                    }

                    if (item.id === 'biometrics') {
                      Alert.alert(
                        '',
                        'Do you want to allow “Biometrics Authentication” to use fingerprint?',
                        [
                          {
                            isPreferred: true,
                            onPress() {
                              dispatch(setBiometric(true));
                            },
                            style: 'default',
                            text: 'Yes',
                          },
                          {
                            style: 'cancel',
                            text: 'No',
                          },
                        ],
                      );
                    }
                  }}
                  label={item.label}
                  icon={item.icon}
                  active={item.id === 'biometrics' ? biometrics : accountSetUp[item.id]}
                  iconColor={item.color}
                />
              );
            }}
          />
        </Container>
      </VirtualScroll>
    </>
  );
}
