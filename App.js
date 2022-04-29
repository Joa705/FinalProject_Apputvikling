import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox, ImageBackground} from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import styles from './GlobalStyles';
import Main from './pages/Main';
import Room from './pages/Room';
import EditPatient from './pages/EditPatient';
import AddPatient from './pages/AddPatient';
import Login from './pages/Login'

LogBox.ignoreLogs(['Setting a timer'])
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release'])
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state.'])
LogBox.ignoreLogs(["Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix"])


  // //Background image
  // const backgroundImage = require('./images/hospitalTheme.jpg')

  // //Theme in order to show the background
  // const navTheme = {
  //   ...DefaultTheme,
  //   colors: {
  //     background: 'transparent',
  //   },
  // };


//Stacknavigator
const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <>


    <NavigationContainer >
    <Stack.Navigator >
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Main" component={Main}/>
      <Stack.Screen name="EditPatient" component={EditPatient} />
      <Stack.Screen name="AddPatient" component={AddPatient} />
      <Stack.Screen name="Room" component={Room} />
      
    </Stack.Navigator>
    </NavigationContainer>


    </>
    
  );
}


const appStyle = StyleSheet.create({
  background: {
    flex:1,
    justifyContent: "center",
    backgroundColor: "red"
  
  }
});