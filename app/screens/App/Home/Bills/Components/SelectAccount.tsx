import { FlatList } from 'react-native';

import {
  AccountCard,
  AltHeader,
  Container,
  Divider,
  TagTitle,
  VirtualScroll,
} from 'components';
import { pallets } from 'constant';
import { useSelector } from 'store';
import { loopedColor } from 'utils';

interface Props {
  onPress: (account: string) => void;
}

export default function SelectAccount({ onPress }: Props): JSX.Element | null {
  const { accounts, user } = useSelector(state => state.auth);

  return (
    <>
      <AltHeader color={pallets.primary} label="Transfer Money" />
      <>
        <VirtualScroll>
          <Container backgroundColor="transparent">
            <TagTitle title="Select Account to Debit" marginBottom={40} />
            <FlatList
              data={accounts}
              ItemSeparatorComponent={() => <Divider />}
              renderItem={({ item, index }) => {
                if (item.accountType !== 'SavingsOrCurrent') {
                  return null;
                }

                return (
                  <AccountCard
                    bookBalance={item?.availableBalance || ''}
                    accountNumber={item?.accountNumber}
                    balance={item?.withdrawableAmount || '0'}
                    name={user?.fullName || ''}
                    variant="small"
                    onPress={() => {
                      onPress(item.accountNumber);
                    }}
                    backgroundColor={loopedColor(index, [
                      pallets.primary,
                      pallets.secondary,
                      pallets.primaryBlack,
                    ])}
                  />
                );
              }}
            />
          </Container>
        </VirtualScroll>
      </>
    </>
  );
}
