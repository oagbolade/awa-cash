import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

import { Divider } from '../Element';

import { layout, pallets } from 'constant';

const { spacing } = layout;

interface DynamicBottomSheetProps {
  children?: React.ReactNode;
  snapPoints?: (string | number)[];
}

export interface BottomSheetHandle {
  open: () => void;
  close: () => void;
}

const DEFAULT_SNAP_POINTS = ['25%', '50%', '75%'];

const DynamicBottomSheet = forwardRef<BottomSheetHandle, DynamicBottomSheetProps>(
  function (
    { children, snapPoints = DEFAULT_SNAP_POINTS }: DynamicBottomSheetProps,
    ref,
  ): JSX.Element {
    const bottomSheetRef = useRef<BottomSheet>(null);

    useImperativeHandle(ref, () => ({
      close() {
        bottomSheetRef.current?.close();
      },
      open() {
        open();
      },
    }));

    const open = useCallback(() => {
      bottomSheetRef.current?.expand();
    }, []);

    const BackDrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={1} />
      ),
      [],
    );

    return (
      <BottomSheet
        ref={bottomSheetRef}
        backdropComponent={BackDrop}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose>
        <View style={[styles.contentContainer]}>
          <Divider space="m" />
          {children}
        </View>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: pallets.white,
    flex: 1,
    padding: spacing.m,
  },
});

export default DynamicBottomSheet;
