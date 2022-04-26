import { useEffect, useState } from 'react';
import {ImageBackground, StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {getDataLocal} from '../functions/Storage'
import { BarChart, LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import {chartStyle, chartConfig} from '../functions/Charts'
import { heartReatIcon, breathIcon, oxygenIcon } from '../functions/Icons';
import { updatePatient, updatePatientDetails } from '../functions/Firestore';
import { Button, TextInput } from 'react-native';

const screenWidth = Dimensions.get("window").width;

export default function EditPatient({navigation, route}){
    const { selectedPatient } = route.params;
    const [patient, SetPatient] = useState([])

    getDataLocal(selectedPatient, SetPatient);
    
    const [newName, setName] = useState("");
    const [newRoom, setRoom] = useState("");

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <TextInput style={styles.input} onChangeText={setName} value={newName} placeholder="Name"/>
        <TextInput style={styles.input} onChangeText={setRoom} value={newRoom} placeholder="Room"/>

        <Button title="Confirm" onPress={() => updatePatientDetails(navigation, selectedPatient, newName, newRoom)}/>
        
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