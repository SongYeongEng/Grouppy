import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Carousel from '@/components/Carousel';
import AntDesign from '@expo/vector-icons/build/AntDesign';
import Category from '@/components/Category';

export default function Tab() {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search for food, hotels" />
        <AntDesign name="search1" size={24} color="#E52B50" />
      </View>
      <Carousel/>
      <Category/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
    
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#C0C0C0",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 11,
    marginTop: 10,
    marginHorizontal: 10,
  },
});