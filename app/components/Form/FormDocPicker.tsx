import { useFormikContext } from 'formik';
import { Alert, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

import { Icon } from 'assets';
import { Text } from 'components/General';
import { layout, pallets } from 'constant';
import { useTheme } from 'hooks';

interface FieldKeys {
  type: string;
  id: string;
  utility: string;
}

interface Props {
  label?: string;
  placeholder?: string;
  name: keyof FieldKeys;
  note?: {
    description: string;
    color?: 'text' | 'primary';
    weight?: 'reg' | 'bold';
  };
  disabled?: boolean;
  marginBottom?: number;
}

const { fonts, input } = layout;

type PickerOptionType = 'camera' | 'upload';
const pickerOption: PickerOptionType[] = ['camera', 'upload'];

export default function FormDocPicker({
  name,
  label,
  note,
  placeholder,
  disabled,
  marginBottom = 20,
}: Props): JSX.Element | null {
  const [docResponse, setDocResponse] =
    useState<DocumentPicker.DocumentPickerResponse | null>(null);
  const [imageResponse, setImageResponse] =
    useState<ImagePicker.ImagePickerSuccessResult | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['15%', '20%', '50%'], []);

  const { color } = useTheme();

  const { setFieldTouched, setFieldValue, errors, touched, values, setFieldError } =
    useFormikContext<FieldKeys>();

  const error = !!(errors[name] && touched[name]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const BackDrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={1} />
    ),
    [],
  );

  const handleDocumentPicker = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        copyTo: 'cachesDirectory',
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      const split = result.uri.split('/');
      const path = split.pop();
      const inbox = split.pop();
      const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${path}`;
      const filePath =
        Platform.OS === 'android' ? result.uri : `file://${decodeURI(realPath)}`;

      const file = await RNFS.readFile(filePath, 'base64');
      // const value = `data:${result.type};base64,${file}`;
      const value = file;

      setDocResponse(result);
      setImageResponse(null);
      setFieldValue(name, value);
    } catch (error_) {
      console.warn(error_ as unknown as string);
      setFieldError(name, 'Please select a file');
      setFieldTouched(name);
    }
  };

  const handleTakePicture = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (!status) {
        Alert.alert(
          'Permission required',
          'We need Camera roll permission to access your photos',
          [
            { text: 'Dismiss' },
            {
              onPress: handleTakePicture,
              text: 'Try Again',
            },
          ],
        );

        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.2,
      });

      if (!result.canceled) {
        // const value = `data:${'image/png'};base64,${result.assets[0]?.base64}`;
        const value = result.assets[0]?.base64;

        setImageResponse(result);
        setDocResponse(null);
        setFieldValue(name, value);
        setFieldTouched(name);
      }
    } catch {
      //TODO: DELETE ON PROD
      if (__DEV__) {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
          base64: true,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.2,
        });

        if (!result.canceled) {
          // const value = `data:${'image/png'};base64,${result.assets[0]?.base64}`;
          const value = result.assets[0]?.base64;

          setImageResponse(result);
          setDocResponse(null);
          setFieldValue(name, value);
        }
      }
    }
  };

  const imageName = imageResponse?.assets[0]?.fileName ?? 'Photo';

  return (
    <>
      <Text
        variant="reg-400"
        size={fonts.subhead}
        color={disabled ? color.border : error ? color.red : color.textSecondary}
        style={{
          marginBottom: 8,
          paddingLeft: 5,
        }}>
        {label}
      </Text>
      <TouchableOpacity
        onPress={() => {
          handlePresentModalPress();
        }}
        style={[
          styles.container,
          {
            backgroundColor: error ? `${color.red}10` : color.input,
            borderColor: disabled ? color.border : error ? color.red : color.transparent,
          },
        ]}>
        <View style={{ flex: 1 }}>
          <Text color={values[name] ? color.text : pallets.grey2}>
            {/* {values[name]?.assets?.[0]?.fileName || placeholder || label} */}
            {docResponse?.name || imageName || placeholder || label}
          </Text>
        </View>
        <Icon size={20} name="chevron-down" color={color.grey} />
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: error ? 8 : marginBottom,
          marginTop: error || Boolean(note) || error ? 10 : 0,
        }}>
        {error && (
          <View
            style={{
              alignItems: 'flex-end',
              flex: 1,
            }}>
            <Text textAlign="right" size={fonts.caption2} color={color.red}>
              {errors[name]}
            </Text>
          </View>
        )}
        {Boolean(note) && !error && (
          <View style={styles.note}>
            <Text
              variant={note?.weight === 'bold' ? 'bold-700' : undefined}
              size={fonts.subhead}
              color={note?.color === 'primary' ? color.primary : color.text}>
              {note?.description}
            </Text>
          </View>
        )}
      </View>
      <BottomSheetModal
        backdropComponent={BackDrop}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}>
        {pickerOption.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.pickerItem}
              onPress={() => {
                bottomSheetModalRef.current?.close();

                if (item === 'upload') {
                  handleDocumentPicker();
                }

                if (item === 'camera') {
                  handleTakePicture();
                }
              }}>
              <Text>
                {item === 'camera' ? 'Take a picture' : 'Upload from your device'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: input.inputRadius,
    borderWidth: input.borderSize,
    flexDirection: 'row',
    height: input.height,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  note: {
    alignItems: 'flex-end',
  },
  pickerItem: {
    justifyContent: 'center',
    padding: 16,
  },
});
