import { useRef, useState } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNCamera, TakePictureOptions } from 'react-native-camera';
import { Portal } from '@gorhom/portal';

import { Text } from '../General';

import { useTheme } from 'hooks';
import { pallets } from 'constant';

const CAPTURE = 80;

export interface CameraProps {
  onPictureTaken: () => void;
  onPictureTakenError?: (error: unknown) => void;
  onPictureTakenCancel: () => void;
  base64: (data: string) => void;
  image: (data: string) => void;
  mode?: 'front' | 'back';
}

function Camera({
  base64,
  onPictureTaken,
  onPictureTakenCancel,
  onPictureTakenError,
  mode = 'front',
  image,
}: CameraProps): JSX.Element | null {
  const ref = useRef<RNCamera>(null);
  const [pause, setPause] = useState(false);
  const { color } = useTheme();

  const takePicture = async () => {
    try {
      if (ref) {
        const options: TakePictureOptions = {
          base64: true,
          fixOrientation: true,
          forceUpOrientation: true,
          imageType: 'jpeg',
          mirrorImage: true,
          orientation: 'portrait',
          pauseAfterCapture: true,
          quality: 0.1,
        };
        const data = await ref?.current?.takePictureAsync(options);

        if (data) {
          setPause(true);

          base64(data.base64 as string);
          image(data.uri as string);
        }
      }
    } catch (error) {
      onPictureTakenError && onPictureTakenError(error);
    }
  };

  return (
    <Portal>
      <View style={[styles.container, { backgroundColor: color.white }]}>
        <RNCamera
          ref={ref}
          style={styles.preview}
          type={
            mode === 'front'
              ? RNCamera.Constants.Type.front
              : RNCamera.Constants.Type.back
          }
          flashMode={RNCamera.Constants.FlashMode.off}
          ratio="4:4"
          autoFocus="on"
          captureAudio={false}
          androidCameraPermissionOptions={{
            buttonNegative: 'Cancel',
            buttonPositive: 'Ok',
            message: 'We need your permission to use your camera',
            title: 'Permission to use camera',
          }}
        />
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          {!pause && (
            <TouchableOpacity
              onPress={takePicture}
              style={[
                styles.capture,
                {
                  backgroundColor: color.white,
                },
              ]}>
              <View
                style={{
                  borderRadius: 50,
                  borderWidth: 10,
                  height: CAPTURE - 20,
                  width: CAPTURE - 20,
                }}
              />
            </TouchableOpacity>
          )}
          {pause && (
            <View style={styles.confirm}>
              <TouchableOpacity
                onPress={() => {
                  onPictureTakenCancel();
                  ref.current?.resumePreview();
                  setPause(false);
                }}
                style={[styles.captureButtons]}>
                <Text
                  variant="bold-700"
                  textTransform="uppercase"
                  size={20}
                  color={pallets.red}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onPictureTaken();
                }}
                style={[styles.captureButtons]}>
                <Text
                  variant="bold-700"
                  textTransform="uppercase"
                  size={20}
                  color={pallets.green}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  capture: {
    alignItems: 'center',
    borderRadius: 50,
    flex: 0,
    height: CAPTURE,
    justifyContent: 'center',
    margin: 20,
    width: CAPTURE,
  },
  captureButtons: {
    alignItems: 'center',
    flex: 1,
    height: CAPTURE + 20,
    justifyContent: 'center',
    padding: 20,
  },
  confirm: {
    backgroundColor: pallets.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  preview: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default Camera;
