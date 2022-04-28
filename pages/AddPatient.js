import { useEffect, useState } from 'react';
import {ImageBackground, StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {getDataLocal} from '../functions/Storage'
import { BarChart, LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import {chartStyle, chartConfig} from '../functions/Charts'
import { heartReatIcon, breathIcon, oxygenIcon } from '../functions/Icons';
import { updatePatient, updatePatientDetails, addPatient} from '../functions/Firestore';
import { Button, TextInput } from 'react-native';

const screenWidth = Dimensions.get("window").width;

export default function AddPatient({navigation, route}){
    const { selectedPatient, RoomId } = route.params;
    
    const [newName, setName] = useState("");
    const [newLname, setNewLName] = useState("");
    const [newAge, SetNewAge] = useState("");

  

    const addNewPatient = () => {
      if(newName.length <= 0){return}
      if(newLname.length <= 0){return}
      if(newAge.length <= 0){return}

      
      addPatient(navigation, newName, RoomId, newLname, newAge)
      route.params.onSelect()
    }

    return (
        <View style={styles.container}>

        <TextInput style={styles.input} onChangeText={setName} value={newName} placeholder="First Name"/>
        <TextInput style={styles.input} onChangeText={setNewLName} value={newLname} placeholder="Last Name"/>
        <TextInput style={styles.input} onChangeText={SetNewAge} value={newAge} placeholder="Age" keyboardType='number-pad'/>

        <Button title="Confirm" onPress={() => addNewPatient()}/>
        
        <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    input: {
      height: 40,
      margin: 4,
      borderWidth: 1,
      padding: 10,
    },
  });