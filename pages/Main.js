import {useEffect, useState, useRef} from 'react'
import {ImageBackground ,StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert} from 'react-native';
import { Button, TextInput } from 'react-native';
import { DataTable, IconButton } from 'react-native-paper';
import styles from '../GlobalStyles';
import { GetPatientsAndStoreLocal,  updatePatient, addPatientChart, getLastPatientChart} from '../functions/Firestore'
import { getRandomNumber } from '../functions/Storage';

  //Screen dimentions
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;



export default function Main({navigation}){
  
    //useStates

    const [selectedPatient, setSelectedPatient] = useState("");
    const [patientData, setPatientData] = useState([]);

    
    const clearSelectedPatient = async () => {
        setSelectedPatient(null);
      }

    // Alert messages if patients is in critical condition or dead
    const createTwoButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    useEffect(() => {
        GetPatientsAndStoreLocal(setPatientData)
    }, [])



    useEffect(() =>{

        // Update the status of patient using random number generator
        const updatePatientStatus = (id, chart) =>{
            const updateHeart = getRandomNumber(0, 200);
            const updateBreath = getRandomNumber(0, 100);
            const updateOxygen = getRandomNumber(0, 100);

            updatePatient(id, updateHeart, updateBreath, updateOxygen);
            addPatientChart(id, updateHeart, updateBreath, updateOxygen);
            
        }

        // Fetch some data every minute.
        const Interval = setInterval(() => {
            console.log("Interval");

            patientData.map((patient) => { 
                updatePatientStatus(patient.id, patient.Chart);
            })

            GetPatientsAndStoreLocal(setPatientData);

                  
        }, 1000 * 3)

        return () => {
            clearInterval(Interval)
        }

    }, [patientData])



    return(

        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            
            <View style={MainStyles.topContainer}>

            <Text>Patient Rooms</Text>

                <DataTable>
                    <DataTable.Header>
                    <DataTable.Title>Room Nr</DataTable.Title>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>HR</DataTable.Title>
                    <DataTable.Title>BR</DataTable.Title>
                    <DataTable.Title>OLevel</DataTable.Title>
                    <DataTable.Cell numeric>
                            <IconButton icon="" onPress={() => setSelectedPatient(patient.id)} disabled />
                    </DataTable.Cell>
                </DataTable.Header>

                    {patientData.map((patient) => {
                    return <View key={patient.id}>
                        
                        <DataTable.Row>
                            <DataTable.Cell>{patient.Room}</DataTable.Cell>
                            <DataTable.Cell>{patient.Name}</DataTable.Cell>
                            <DataTable.Cell>{patient.Heart}</DataTable.Cell>
                            <DataTable.Cell>{patient.Breath}</DataTable.Cell>
                            <DataTable.Cell>{patient.Oxygen}</DataTable.Cell>

                            <DataTable.Cell numeric>
                            <IconButton icon="eye" onPress={() => setSelectedPatient(patient.id)} />
                            </DataTable.Cell>
                            
                        </DataTable.Row>




                    </View>
                    
                    })}

                </DataTable>


            </View>
            

            <View style={MainStyles.botContainer}>
                
            <TouchableOpacity style={styles.ButtonContainer} onPress={() => {navigation.navigate('AddPatient', {selectedPatient}); clearSelectedPatient();}}>
                    <Text style={styles.ButtonText}>Add Patient</Text>
                </TouchableOpacity>
                
                {selectedPatient?
            
                    <TouchableOpacity  style={styles.ButtonContainer} disabled={selectedPatient ? false : true} onPress={() => {navigation.navigate('EditPatient', {selectedPatient}); clearSelectedPatient();}}>
                        <Text style={styles.ButtonText}>Edit Patient Details</Text>
                    </TouchableOpacity>
                        
                :
                 <Text></Text>
                }
                {selectedPatient?
                
                <TouchableOpacity style={styles.ButtonContainer} disabled={selectedPatient ? false : true} onPress={() => {navigation.navigate('Room', {"selectedPatient": selectedPatient});  clearSelectedPatient();}}>
                    <Text style={styles.ButtonText}>Show Details</Text>
                </TouchableOpacity>
                :
                    <Text></Text>
                }

            </View>




         

        </View>
    )
}


const MainStyles = StyleSheet.create({
    topContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth,
  
        
    },
    botContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth,
           
    }
});