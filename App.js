import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from './GlobalStyles';
import Room1 from './pages/Room1';
import Room2 from './pages/Room2';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Room1 />
      <Room2 />
      <StatusBar style="auto" />
    </View>
  );
}


