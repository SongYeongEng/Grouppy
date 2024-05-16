import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import Login from './login';
export default function App() {
  return (
    <View className=" items-center justify-center bg-white">  
    <Login/>
    </View>
  );
}
