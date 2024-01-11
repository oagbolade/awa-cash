import { forwardRef, useImperativeHandle, useState } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useFormikContext } from 'formik';

import { Camera } from '../Screen';
import { Button, Divider } from '../Element';

import { Icon } from 'assets';
import { useTheme } from 'hooks';

const { width } = Dimensions.get('window');

interface ImageFieldKeys {
  image: string;
}

interface CaptureImageProps {
  name: keyof ImageFieldKeys;
  onPictureTaken?: () => void;
  onItemPress?: () => void;
  disabled?: boolean;
  isLoading: boolean;
  mode?: 'front' | 'back';
  previewIcon?: IconName;
}

export interface FormCamHandles {
  handleOpen: () => void;
}

const CaptureImage = forwardRef<FormCamHandles, CaptureImageProps>(function (
  {
    disabled,
    name,
    onPictureTaken,
    onItemPress,
    isLoading,
    mode,
    previewIcon,
  }: CaptureImageProps,
  ref,
): JSX.Element | null {
  useImperativeHandle(ref, () => ({
    handleOpen: () => {
      handleOpen();
    },
  }));

  const { color } = useTheme();
  const [image, setImage] = useState<string | undefined>();
  const [visible, setVisible] = useState(false);

  const { setFieldTouched, setFieldValue, errors, touched, handleSubmit, values } =
    useFormikContext<ImageFieldKeys>();

  const error = !!(errors[name] && touched[name]);

  const handleOpen = () => setVisible(true);

  return (
    <>
      {!visible && (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={[
              styles.container,
              { borderColor: color.primary },
              error && { borderColor: color.red, borderWidth: 1.5 },
              Boolean(values[name]) && { borderStyle: 'solid', borderWidth: 1 },
            ]}
            onPress={() => {
              onItemPress?.();
              setVisible(true);
            }}>
            {image === undefined ? (
              <Icon
                name={previewIcon || 'user'}
                size={width * 0.35}
                color={color.primary}
              />
            ) : (
              <Image source={{ uri: image }} style={styles.image} />
            )}
          </TouchableOpacity>
          {error && <View style={{ alignItems: 'flex-end', padding: 10 }} />}
          <Divider space="xl" />
          <>
            {!values[name] && (
              <Button
                label="Take Photo"
                onPress={() => {
                  handleOpen();
                  onItemPress?.();
                }}
              />
            )}
            {values[name] && (
              <>
                <Button
                  label="Retake Photo"
                  variant="transparent"
                  onPress={() => {
                    handleOpen();
                    onItemPress?.();
                  }}
                />
                <Divider />
                <Button
                  label="Continue"
                  disabled={disabled}
                  isLoading={isLoading}
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              </>
            )}
          </>
        </View>
      )}
      {visible && (
        <Camera
          mode={mode}
          base64={data => setFieldValue(name, data)}
          image={data => {
            setImage(data);
          }}
          onPictureTakenCancel={() => setFieldValue(name, null)}
          onPictureTaken={() => {
            setFieldTouched(name, true);
            setVisible(false);
            onPictureTaken && onPictureTaken();
          }}
        />
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    height: width * 0.8,
    justifyContent: 'center',
    overflow: 'hidden',
    width: width * 0.9,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default CaptureImage;
