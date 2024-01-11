import { FlatList, View } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

import { AltHeader, Container, Text } from 'components';
import { lottie } from 'assets';

export default function Notifications(): JSX.Element {
  return (
    <>
      <AltHeader label="Notifications" />
      <Container>
        <FlatList
          data={[]}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center' }}>
              <AnimatedLottieView
                source={lottie['empty-anim']}
                autoPlay
                loop
                style={{
                  height: 200,
                  width: 200,
                }}
              />
              <Text>No Notifications</Text>
            </View>
          )}
          renderItem={() => {
            return <View />;
          }}
        />
      </Container>
    </>
  );
}
