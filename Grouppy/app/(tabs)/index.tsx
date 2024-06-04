import React from 'react';
import { View, StyleSheet } from 'react-native';
import Carousel from '../../components/Carousel';

export default function Tab() {
  const images = [
    'https://ds300.github.io/patch-package/patch-package.svg',
    
  ];

  return (
    <View style={styles.container}>
      <Carousel />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});