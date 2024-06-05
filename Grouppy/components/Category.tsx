import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';


export default function ThreeButtonComponent() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Image 
          style={styles.image} 
          source={require('../assets/images/coffee.svg')} 
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image 
          style={styles.image} 
          source={require('../assets/images/french fries.svg')} 
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image 
          style={styles.image} 
          source={require('../assets/images/donuts.svg')} 
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image 
          style={styles.image} 
          source={require('../assets/images/more.svg')} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    //backgroundColor: 'lightgreen',
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: '50%',
    height: '50%',
    borderRadius: 35,
  },
});