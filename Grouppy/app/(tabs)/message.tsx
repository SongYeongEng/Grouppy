import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

type Message = {
  id: number;
  user_id: number;
  message_text: string;
 // created_at: string;
};

const MessageScreen = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://192.168.101.94:8080/messages`);
                const formattedMessages = response.data.map((message: any) => ({
                    id: message.messageId,
                    user_id: message.user.userId,
                    message_text: message.messageText,
                    created_at: message.createdAt
                }));
                setMessages(formattedMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchData();
    }, []);

    const sendMessage = async () => {
        try {
            const response = await axios.post(`http://192.168.101.94:8080/messages`, {
                user: 2, // Replace with dynamic user
                room: 2, // Replace with dynamic room
                messageText: newMessage,

            });

            if (response.status === 200) {
                setNewMessage('');
                console.log('Backend response:', response.data);
                const newMessageData = {
                    id: response.data.messageId, // Assuming response.data contains the new message data
                    user_id: response.data.user.userId,
                    message_text: response.data.messageText,
                };
                setMessages([...messages, newMessageData]);
            }

        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.messagesContainer}
                data={messages}
                keyExtractor={(item) => (item?.id ? item.id.toString() : '')}
                renderItem={({ item }) => (
                    <View style={styles.message}>
                        <Text style={styles.messageUser}>{item.user_id}</Text>
                        <Text style={styles.messageText}>{item.message_text}</Text>
                    </View>
                )}
            />
            <TextInput
                style={styles.input}
                value={newMessage}
                onChangeText={setNewMessage}
                placeholder="Type a message..."
            />
            <Button title="Send" onPress={sendMessage} />
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
