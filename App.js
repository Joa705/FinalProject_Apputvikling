import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './GlobalStyles';
import Main from './pages/Main';
import Room1 from './pages/Room1';
import Room2 from './pages/Room2';


LogBox.ignoreLogs(['Setting a timer'])

//Stacknavigator
const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Main}/>
      <Stack.Screen name="Room1" component={Room1} />
      <Stack.Screen name="Room2" component={Room2} />
    </Stack.Navigator>
    </NavigationContainer>
 
  );
}


