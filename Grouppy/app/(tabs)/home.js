import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from '@firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from '@firebase/auth';
import { initializeApp } from '@firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBj8DpZEVK3ikXBND9ODUOlRFrXQd004IU",
  authDomain: "grouppy-4fab9.firebaseapp.com",
  projectId: "grouppy-4fab9",
  storageBucket: "grouppy-4fab9.appspot.com",
  messagingSenderId: "267607572756",
  appId: "1:267607572756:web:a9901c3d7047d8d4320201"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const Home = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const signIn = async () => {
      const result = await signInAnonymously(auth);
      setUser(result.user);
    };

    signIn();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribeMessages = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messages);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeMessages();
    };
  }, []);

  const handleSend = async () => {
    if (message.trim() && user) {
      await addDoc(collection(db, 'messages'), {
        text: message,
        createdAt: new Date(),
        user: `User-${user.uid.substring(0, 5)}`  // Display part of the UID to identify users
      });
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((msg) => (
          <View key={msg.id} style={styles.message}>
            <Text style={styles.messageUser}>{msg.user}</Text>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  message: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  messageUser: {
    fontWeight: 'bold',
  },
  messageText: {
    marginTop: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 4,
  },
});

export default Home;
