import { FlatList, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { TransactionCard } from './Components';

import { AltHeader, Container, Divider, Text } from 'components';
import { useGetTransactionsPagedQuery } from 'service';
import { lottie } from 'assets';

export default function Transactions(): JSX.Element {
  const transactions = useGetTransactionsPagedQuery({
    ByDescending: true,
    OrderBY: 'createdDate',
  });

  return (
    <>
      <AltHeader label="Transactions" />
      <Container>
        <FlatList
          data={transactions.data?.data?.results || []}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center' }}>
              <LottieView
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
      </Container>
    </>
  );
}
