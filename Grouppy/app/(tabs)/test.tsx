import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Test = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Make GET request when component mounts
    fetch('http://localhost:8080/greeting?name=User')
      .then(response => response.json())
      .then(data => {
        // Extract message from response data
        const { content } = data;
        setMessage(content);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
