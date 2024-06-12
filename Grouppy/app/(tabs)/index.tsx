import React, { useCallback } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import Carousel from '@/components/Carousel';
import AntDesign from '@expo/vector-icons/AntDesign';
import Category from '@/components/Category';
import CardButton from '@/components/CardButton';

export default function Tab() {
  const handleJoinRoom = useCallback(async (roomId: number) => {
    const userId = 3; // Replace with actual user ID
    try {
      const response = await fetch(`http://localhost:8080/rooms/${roomId}/join?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        Alert.alert('Error', errorText || 'Failed to join room');
        return;
      }

      Alert.alert('Success', 'Successfully joined room');
    } catch (error) {
      Alert.alert('Error', 'An error occurred');
      console.error('Failed to join room', error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search for food, hotels" />
        <AntDesign name="search1" size={24} color="#E52B50" />
      </View>
      <Carousel />
      <Category />
      <CardButton title="Join Room 1" onPress={() => handleJoinRoom(1)} />
      <CardButton title="Join Room 2" onPress={() => handleJoinRoom(2)} />
      <CardButton title="Join Room 4" onPress={() => handleJoinRoom(4)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#C0C0C0',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 11,
    marginTop: 10,
    marginHorizontal: 10,
  },
});
