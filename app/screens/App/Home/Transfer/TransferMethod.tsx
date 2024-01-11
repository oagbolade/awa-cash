import { StyleSheet, TouchableOpacity } from 'react-native';

import { transferSection } from '../Data';

import { Container, Header, Text, Title } from 'components';
import { StackNavigationProps, TransferRoutes } from 'navigation';
import { pallets } from 'constant';
import { Icon } from 'assets';

export default function TransferMethod({
  navigation,
}: StackNavigationProps<TransferRoutes, 'TransferMethod'>): JSX.Element {
  return (
    <>
      <Header color={pallets.primary} iconColor={pallets.white} />
      <Container backgroundColor={pallets.primary}>
        <Title
          title="Transfer Money"
          color={pallets.white}
          subColor={pallets.white}
          subtitle="How would you like to make your transfer?"
        />
        {transferSection.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.section}
              onPress={() => {
                navigation.navigate(item.route);
              }}>
              <Text color={pallets.white}>{item.title}</Text>
              <Icon name="arrow-right-outline" color={pallets.white} />
            </TouchableOpacity>
          );
        })}
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    alignItems: 'center',
    borderColor: pallets.white,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 20,
    paddingHorizontal: 12,
  },
});
