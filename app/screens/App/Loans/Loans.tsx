// import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { Image, StyleSheet, View } from 'react-native';

import { Container, Divider, TabHeader, Text } from 'components';
// import { layout, pallets } from 'constant';
import { layout } from 'constant';
// import { Icon } from 'assets';

// const description = 'We make a loan decision based on the information we have about you.';

// const savingData = [
//   {
//     description,
//     title: 'Apply for a loan',
//   },
//   {
//     description,
//     title: 'Manage loans',
//   },
//   {
//     description,
//     title: 'Loan repayment',
//   },
//   {
//     description,
//     title: 'Loan history',
//   },
// ];

const { window, fonts } = layout;

export default function Loans(): JSX.Element {
  return (
    <>
      <TabHeader title="Loans" />
      {/* <VirtualScroll bounces={false}> */}
      <Container style={{ justifyContent: 'center' }} alignItems="center">
        <View style={{ alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('assets/images/app/loan-coming-soon.png')}
          />
          <Divider space="l" />
          <Text variant="bold-700" size={fonts.body}>
            Coming Soon
          </Text>
          <Divider space="s" />
          <Text textAlign="center">
            Stay tuned as we put the finishing touches on this innovative solution that
            will make your life easier and more enjoyable. We can't wait to share it with
            you!
          </Text>
        </View>
        {/* <Text color={pallets.white}>Select a savings plan to start saving</Text>
          <Divider />
          <FlatList
            data={savingData}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={styles.item} activeOpacity={0.9}>
                  <Icon name="moneys" color={pallets.primary} />
                  <Divider space="m" />
                  <Text variant="bold-700" color={pallets.dark}>
                    {item.title}
                  </Text>
                  <Divider space="s" />
                  <Text size={fonts.caption1} color={pallets.dark}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              );
            }}
          /> */}
      </Container>
      {/* </VirtualScroll> */}
    </>
  );
}

const styles = StyleSheet.create({
  // item: {
  //   backgroundColor: pallets.white,
  //   borderRadius: spacing.s,
  //   padding: spacing.m,
  //   paddingVertical: spacing.l,
  // },
  image: {
    height: window.width * 0.7,
    width: window.width * 0.7,
  },
});
