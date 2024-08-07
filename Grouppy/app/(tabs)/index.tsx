import React, { useCallback } from 'react';
import { View, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import Carousel from '@/components/Carousel';
import AntDesign from '@expo/vector-icons/AntDesign';
import Category from '@/components/Category';
import CardButton from '@/components/CardButton';

export default function Tab() {
  const handleJoinRoom = useCallback(async (roomId: number) => {
    const userId = 3; // Replace with actual user ID
    try {
      const response = await fetch(`http://192.168.101.94:8080/rooms/${roomId}/join?userId=${userId}`, {
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
    // Assuming the response contains the room ID
    const data = await response.text();
   //const joinedRoomId = data.roomId;

    // Navigate to the message screen with the room ID
    router.replace('/message');

      Alert.alert('Success', 'Successfully joined room');
    } catch (error) {
      Alert.alert('Error', 'An error occurred');
      console.error('Failed to join room', error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
          <View style={styles.searchContainer}>
            <TextInput placeholder="Search for food, hotels" />
            <AntDesign name="search1" size={24} color="#E52B50" />
          </View>
          <Carousel />
          <Category />
          <CardButton title="Join Room 1" onPress={() => handleJoinRoom(1)} />
          <CardButton title="Join Room 2" onPress={() => handleJoinRoom(2)} />
          <CardButton title="Join Room 4" onPress={() => handleJoinRoom(4)} />
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
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
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E52B50',
    borderRadius: 30,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
