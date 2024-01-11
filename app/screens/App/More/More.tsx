import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { Avatar } from './Components';
import { moreSection } from './Data';

import { Icon } from 'assets';
import { layout, pallets } from 'constant';
import { Container, Divider, TabHeader, Text, VirtualScroll } from 'components';
import { useTheme } from 'hooks';
import { setAuthenticated, useDispatch, useSelector } from 'store';
import { AppRoutes, RootNavigationProp, TabRoutes } from 'navigation';

const { spacing } = layout;

export default function More({
  navigation,
}: RootNavigationProp<AppRoutes, TabRoutes, 'More'>): JSX.Element {
  const { color } = useTheme();
  const { accountSetUp, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const hasCompletedKYC = Object.values(accountSetUp || {}).every(
    value => value === true,
  );

  return (
    <>
      <TabHeader title="More" />
      <>
        <VirtualScroll bounces={false}>
          <Container>
            <Avatar
              level={
                hasCompletedKYC
                  ? user?.nextOfKinName
                    ? '3'
                    : accountSetUp.utility
                    ? '2'
                    : '1'
                  : '1'
              }
            />
            <Divider space="xl" />
            <FlatList
              data={moreSection}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                if (
                  accountSetUp.utility &&
                  item.id === 'upgrade' &&
                  Boolean(user?.nextOfKinName)
                ) {
                  return null;
                }

                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.id === 'logout') {
                        console.log('Logging out...');
                        Alert.alert('', 'Are you sure you want to logout?', [
                          {
                            onPress() {
                              dispatch(setAuthenticated(false));
                            },
                            style: 'destructive',
                            text: 'Yes',
                          },
                          {
                            isPreferred: true,
                            style: 'cancel',
                            text: 'No',
                          },
                        ]);
                      } else {
                        // if (item.id === 'upgrade') {}
                        if (item.route) {
                          navigation.navigate('MoreStack', { screen: item.route });
                        }

                        if (item.link) {
                          WebBrowser.openBrowserAsync(item.link);
                        }
                      }
                    }}
                    style={[
                      styles.sectionCard,
                      { backgroundColor: color.altBG, marginBottom: 16 },
                    ]}>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                      <Icon
                        name={item.icon}
                        color={item.color}
                        style={{ marginRight: 12 }}
                        size={20}
                      />
                      <Text>{item.title}</Text>
                    </View>
                    <Icon name="chevron-right-outline" size={16} color={pallets.grey} />
                  </TouchableOpacity>
                );
              }}
            />
          </Container>
        </VirtualScroll>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  sectionCard: {
    alignItems: 'center',
    borderColor: pallets.border2,
    borderRadius: spacing.s,
    borderWidth: 0.2,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.l,
    paddingHorizontal: spacing.padding,
    shadowColor: pallets.grey3,
    shadowOffset: {
      height: spacing.s,
      width: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: spacing.s,
  },
});
