import { useCallback, useMemo, useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { pallets } from 'constant';

export default function BottomSheetList(): JSX.Element {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <Button onPress={handlePresentModalPress} title="Present Modal" color="black" />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: pallets.notification,
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
  },
});
