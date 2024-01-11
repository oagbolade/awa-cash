import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { upgradeAccountOptions } from '../Data';

import { Container, Divider, Header, Text, VirtualScroll } from 'components';
import { layout, pallets } from 'constant';
import { AppRoutes, MoreRoutes, RootNavigationProp } from 'navigation';
import { Icon } from 'assets';
import { useSelector } from 'store';

const { fonts, spacing } = layout;

export default function UpgradeAccount({
  navigation,
}: RootNavigationProp<AppRoutes, MoreRoutes, 'UpgradeAccount'>): JSX.Element {
  const { accountSetUp, user } = useSelector(state => state.auth);

  return (
    <>
      <Header label="Upgrade Account" color={pallets.primary} iconColor={pallets.white} />
      <>
        <VirtualScroll>
          <Container>
            <Divider space="m" />
            <Text
              textAlign="center"
              variant="body"
              color={pallets.text2}
              size={fonts.subhead}>
              You are currently on
            </Text>
            <Divider space="s" />
            <Text
              textAlign="center"
              variant="title"
              color={pallets.black}
              size={fonts.largeTitle}>
              Level {user?.nextOfKinName ? 3 : accountSetUp.utility ? 2 : 1}
            </Text>
            <Divider space="xxl" />
            <FlatList
              data={upgradeAccountOptions}
              ItemSeparatorComponent={() => <Divider />}
              renderItem={({ item }) => {
                if (item.id === 'level-two' && accountSetUp.utility) {
                  return null;
                }

                if (item.id === 'level-three' && Boolean(user?.nextOfKinName)) {
                  return null;
                }

                return (
                  <TouchableOpacity
                    style={styles.upgradeContainer}
                    onPress={() => {
                      if (item.route) {
                        navigation.navigate(item.route);
                      } else if (item.id === 'level-two') {
                        navigation.navigate('KYCStack', { screen: 'UtilityBill' });
                      }
                    }}>
                    <Icon name="trend-up" color={item.color} />
                    <Divider space="m" />
                    <Text
                      textAlign="left"
                      variant="title"
                      color={pallets.black}
                      size={fonts.title3}>
                      {item.header}
                    </Text>
                    <Divider space="s" />
                    <Text
                      textAlign="left"
                      variant="body"
                      color={pallets.text2}
                      size={fonts.subhead}>
                      {item.paragraph}
                    </Text>
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
  upgradeContainer: {
    backgroundColor: pallets.white,
    borderColor: pallets.border2,
    borderRadius: spacing.s,
    borderWidth: 0.2,
    elevation: spacing.xs,
    padding: spacing.padding,
    shadowOffset: {
      height: spacing.xs,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
