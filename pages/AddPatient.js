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
    const { selectedPatient } = route.params;
    
    const [newName, setName] = useState("");
    const [newLname, setNewLName] = useState("");
    const [newAge, SetNewAge] = useState("");
    const [newRoom, SetRoom] = useState("");

  

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <TextInput style={styles.input} onChangeText={setName} value={newName} placeholder="First Name"/>
        <TextInput style={styles.input} onChangeText={setNewLName} value={newLname} placeholder="Last Name"/>
        <TextInput style={styles.input} onChangeText={SetRoom} value={newRoom} placeholder="Room"/>
        <TextInput style={styles.input} onChangeText={SetNewAge} value={newAge} placeholder="Age" keyboardType='number-pad'/>

        <Button title="Confirm" onPress={() => addPatient(navigation, selectedPatient, newName, newRoom, newLname, newAge)}/>
        
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