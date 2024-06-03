import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';

type Message = {
  id: number; // Ensure you have a unique ID for each message
  user: string;
  content: string;
};

const MessageScreen = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/messages`); // Use appropriate IP for emulator ipv4  
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchData();
    }, []);

    // const sendMessage = async () => {
    //     try {
    //         const response = await axios.post('http://10.0.2.2:8080/messages', {
    //             user: 'User', // Replace with dynamic user
    //             content: newMessage
    //         });
    //         setMessages([...messages, response.data]);
    //         setNewMessage('');
    //     } catch (error) {
    //         console.error('Error sending message:', error);
    //     }
    // };

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.messagesContainer}
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.message}>
                        <Text style={styles.messageUser}>{item.user}</Text>
                        <Text style={styles.messageText}>{item.content}</Text>
                    </View>
                )}
            />
            <TextInput
                style={styles.input}
                value={newMessage}
                onChangeText={setNewMessage}
                placeholder="Type a message..."
            />
            {/* <Button title="Send" onPress={sendMessage} /> */}
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

export default MessageScreen;
