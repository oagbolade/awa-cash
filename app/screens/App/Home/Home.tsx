import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Lottie from 'lottie-react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useRef } from 'react';

import { Advert, AnimPaginator, HomeHeader, TransactionCard } from './Components';
import { homeSection } from './Data';

import { AppRoutes, RootNavigationProp, TabRoutes } from 'navigation';
import {
  AccountCard,
  BottomSheet,
  BottomSheetHandle,
  Container,
  Divider,
  SectionCard,
  Text,
  VirtualScroll,
} from 'components';
import { layout, pallets } from 'constant';
import { loopedColor } from 'utils';
import { Icon, lottie } from 'assets';
import {
  useGetAccountsQuery,
  useGetProfileQuery,
  useGetTransactionsPagedQuery,
} from 'service';
import { useSelector } from 'store';

const { cards, spacing, fonts, misc } = layout;

export default function Home({
  navigation,
}: RootNavigationProp<AppRoutes, TabRoutes, 'Home'>): JSX.Element {
  const accountQuery = useGetAccountsQuery();
  const profileQuery = useGetProfileQuery();
  const transactions = useGetTransactionsPagedQuery({
    ByDescending: true,
    OrderBY: 'createdDate',
  });
  const favoriteSheet = useRef<BottomSheetHandle>(null);

  const { accounts, user, accountSetUp } = useSelector(state => state.auth);

  const aref = useAnimatedRef<Animated.FlatList<CustomerAccountData | null>>();
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  const hasCompletedKYC = Object.values(accountSetUp || {}).every(
    value => value === true,
  );

  return (
    <>
      <HomeHeader image={user?.profileImageUrl} />
      <VirtualScroll
        refreshControl={
          <RefreshControl
            colors={[pallets.primary, pallets.red]}
            tintColor={pallets.primary}
            titleColor={pallets.primary}
            onRefresh={() => {
              accountQuery.refetch();
              profileQuery.refetch();
              transactions.refetch();
            }}
            refreshing={
              profileQuery.isLoading || accountQuery.isFetching || transactions.isFetching
            }
          />
        }>
        <Container paddingHorizontal={0}>
          <Animated.FlatList
            ref={aref}
            horizontal
            data={accounts || []}
            ListHeaderComponent={<View style={{ width: spacing.padding }} />}
            ListEmptyComponent={
              <AccountCard
                bookBalance="******"
                accountNumber="**********"
                balance="0"
                name={user?.fullName || ''}
                backgroundColor={pallets.primary}
                width={cards.cardWidthMax}
              />
            }
            showsHorizontalScrollIndicator={false}
            onScroll={scrollHandler}
            decelerationRate="fast"
            snapToInterval={cards.cardWidth + spacing.padding}
            renderItem={({ index, item }) => {
              return (
                <AccountCard
                  bookBalance={item?.availableBalance || ''}
                  accountNumber={item?.accountNumber || item?.accountType || ''}
                  balance={item?.withdrawableAmount || '0'}
                  name={user?.fullName || ''}
                  width={accounts?.length > 1 ? cards.cardWidth : cards.cardWidthMax}
                  marginRight={spacing.padding}
                  backgroundColor={loopedColor(index, [
                    pallets.primary,
                    pallets.secondary,
                    pallets.primaryBlack,
                  ])}
                />
              );
            }}
          />
          <View style={styles.pagination}>
            {accounts?.map((_, index) => (
              <AnimPaginator key={index} {...{ index, translateX }} />
            ))}
          </View>
          <View style={[styles.section, { paddingTop: 0 }]}>
            <Text variant="bold-700">Quick Link</Text>
            <Divider space="m" />
            <FlatList
              data={homeSection}
              numColumns={4}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ borderWidth: 1 }}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              renderItem={({ item }) => {
                if (item.id === 'favorites') {
                  return null;
                }

                return (
                  <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        if (item.route) {
                          navigation.navigate('HomeStack', item.route);
                        }

                        if (item.id === 'favorites') {
                          favoriteSheet.current?.open();
                        }

                        if (item.id === 'utility') {
                          navigation.navigate('HomeStack', {
                            params: {
                              params: {
                                categoryId: '1',
                                categoryName: 'Utilities',
                                description: 'Pay Utility Bills here',
                              },
                              screen: 'BillerCategory',
                            },
                            screen: 'Bill',
                          });
                        }
                      }}
                      style={[styles.pill, { backgroundColor: item.color }]}>
                      <Icon name={item.icon} color={pallets.white} size={20} />
                    </TouchableOpacity>
                    <Divider space="s" />
                    <Text size={fonts.caption1}>{item.title}</Text>
                  </View>
                );
              }}
            />
          </View>
          {!hasCompletedKYC && (
            <View style={styles.section}>
              <SectionCard
                item={{
                  color: pallets.orange,
                  icon: 'info',
                  title: 'Upgrade your account',
                }}
                onPress={() => {
                  navigation.navigate('KYCStack', { screen: 'AccountSetup' });
                }}
              />
            </View>
          )}
          <View style={styles.section}>
            <Advert />
          </View>
          <View style={[styles.section]}>
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
              <Text variant="bold-700">Transactions</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('HomeStack', { screen: 'Transactions' })
                }>
                <Text variant="medium-500" color={pallets.primary}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>
            <Divider space="m" />
            <FlatList
              data={transactions.data?.data?.results?.slice?.(0, 5) || []}
              ListEmptyComponent={() => (
                <View style={{ alignItems: 'center' }}>
                  <Lottie
                    source={lottie['empty-anim']}
                    autoPlay
                    loop
                    style={{
                      height: 200,
                      width: 200,
                    }}
                  />
                  <Text>No transactions yet</Text>
                </View>
              )}
              ItemSeparatorComponent={() => <Divider space="s" />}
              renderItem={({ item }) => {
                return (
                  <TransactionCard
                    amount={String(item?.amount)}
                    date={item?.createdDate}
                    message={item?.status || ''}
                    type={item?.recordType === 1 ? 'debit' : 'credit'}
                  />
                );
              }}
            />
          </View>
        </Container>
      </VirtualScroll>
      <BottomSheet ref={favoriteSheet} snapPoints={['40%', '50%', '75%']}>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text>Coming Soon</Text>
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  pagination: {
    alignItems: 'center',
    flexDirection: 'row',
    height: misc.pagination,
    justifyContent: 'center',
  },
  pill: {
    alignItems: 'center',
    borderRadius: misc.pill / 2,
    height: misc.pill,
    justifyContent: 'center',
    width: misc.pill,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  section: {
    padding: spacing.padding,
  },
});
