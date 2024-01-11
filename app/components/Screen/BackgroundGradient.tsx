import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface LinearGradientProp {
  children?: React.ReactNode;
}

export default function BackgroundGradient({
  children,
}: LinearGradientProp): JSX.Element | null {
  return (
    <View style={styles.container}>
      {children}
      <LinearGradient
        colors={['rgba(38, 148, 237, 0.9)', 'rgba(41, 174, 114, 0.9)']}
        start={[0.46, 0.02]}
        end={[0.46, 1.92]}
        style={styles.gradient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});
