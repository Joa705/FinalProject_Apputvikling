import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './GlobalStyles';
import Main from './pages/Main';
import Room from './pages/Room';
import EditPatient from './pages/EditPatient';
import AddPatient from './pages/AddPatient';


LogBox.ignoreLogs(['Setting a timer'])

//Stacknavigator
const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Main}/>
      <Stack.Screen name="EditPatient" component={EditPatient} />
      <Stack.Screen name="AddPatient" component={AddPatient} />
      <Stack.Screen name="Room" component={Room} />
      
    </Stack.Navigator>
    </NavigationContainer>
 
  );
}


