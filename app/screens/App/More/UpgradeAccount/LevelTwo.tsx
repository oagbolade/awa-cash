import { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { UploadItem } from '../Components';

import { Button, Container, Divider, Header, Text, VirtualScroll } from 'components';
import { layout, pallets } from 'constant';
import { Icon } from 'assets';
import { useService, useUploadDocumentsMutation } from 'service';
import { MoreRoutes, StackNavigationProps } from 'navigation';

const { fonts, spacing } = layout;

export default function LevelTwo({
  navigation,
}: StackNavigationProps<MoreRoutes, 'LevelTwo'>): JSX.Element {
  const [imageResponse, setImageResponse] =
    useState<ImagePicker.ImagePickerSuccessResult | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [upload, { isError, isLoading, isSuccess, error }] = useUploadDocumentsMutation();

  useService({
    error,
    isError,
    isLoading,
    isSuccess,
    successEffect() {
      navigation.navigate('MoreSuccess', { message: 'Document uploaded successfully' });
    },
  });

  const handleDocumentPicker = async () => {
    try {
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
        setImage(value as string);
      }
    } catch (error_) {
      console.warn(error_ as unknown as string);
      Alert.alert('', 'Something went wrong');
    }
  };

  return (
    <>
      <Header iconColor={pallets.white} label="Upgrade Account" color={pallets.primary} />
      <>
        <VirtualScroll bounces={false}>
          <Container>
            <Divider />
            <Text
              textAlign="left"
              variant="body"
              color={pallets.text2}
              size={fonts.subhead}>
              Upload your valid means of identification to upgrade to level 2
            </Text>
            <Divider />
            <TouchableOpacity onPress={handleDocumentPicker} style={styles.layout}>
              <Icon
                name="document-upload"
                size={fonts.largeTitle}
                color={pallets.primary}
              />
              <Divider />
              <Text
                textAlign="center"
                variant="body"
                color={pallets.text2}
                size={fonts.subhead}>
                {imageResponse
                  ? imageResponse?.assets[0]?.fileName || 'ID'
                  : 'Click here to upload file. File type accepted include: PDF, PNG, JPEG'}
              </Text>
            </TouchableOpacity>
            <Divider space="xxl" />
            {Boolean(image) && (
              <UploadItem
                onCancel={() => {
                  setImage(null);
                  setImageResponse(null);
                }}
                percent={200}
                name={imageResponse?.assets[0]?.fileName || 'ID'}
              />
            )}
            <Divider space="xxl" />
            <Button
              {...{ isLoading }}
              label="Submit"
              onPress={() => {
                if (image) {
                  upload({
                    idBase64: image,
                    idType: 1,
                  });
                }
              }}
            />
          </Container>
        </VirtualScroll>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
    borderColor: pallets.grey,
    borderRadius: spacing.s,
    borderStyle: 'dashed',
    borderWidth: 1,
    justifyContent: 'center',
    padding: spacing.s,
    paddingVertical: spacing.xl,
  },
});
