import {useEffect, useState, useRef} from 'react'
import {ImageBackground ,StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert} from 'react-native';
import styles from '../GlobalStyles';
import {GetPatient, GetPatientAndStoreLocal, updatePatient} from '../functions/Firestore'
import { getRandomNumber } from '../functions/Storage';

  //Screen dimentions
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;



export default function Main({navigation}){
  
    //useStates
    const [patient1, SetPatient1] = useState([])
    const [patient2, SetPatient2] = useState([])


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

    
    // Get the firestore id of current patient
    const getPatientId = (room, patient) =>{
        let patTemp = patient.find(dat => dat.Room == room);
        let patResult = patTemp.id;
        console.log(patResult);

        return patResult
    }


    useEffect(() => {
        GetPatientAndStoreLocal(SetPatient1, "1");
        GetPatientAndStoreLocal(SetPatient2, "2");
    }, [])



    useEffect(() =>{

        // Update the status of patient using random number generator
        const updatePatientStatus = (id, patient) =>{
            const idTemp = getPatientId(id, patient);
            const updateHeart = getRandomNumber(0, 200);
            const updateBreath = getRandomNumber(0, 100);
            const updateOxygen = getRandomNumber(0, 100);

            updatePatient(idTemp, updateHeart, updateBreath, updateOxygen);
        }

        // Fetch some data every minute.
        const Interval = setInterval(() => {
            console.log("Inteval");

            // Update patient status
            updatePatientStatus("1", patient1);
            updatePatientStatus("2", patient2);

            // get patient from firestore
            GetPatientAndStoreLocal(SetPatient1, "1");
            GetPatientAndStoreLocal(SetPatient2, "2");


                  
        }, 1000 * 3)

        return () => {
            clearInterval(Interval)
        }

    }, [patient1, patient2])



    return(
        <View style={styles.container}>
            
            <View style={MainStyles.topContainer}>
                {patient1.map((doc) =>{
                    return(
                        <View style={{alignItems: 'center', justifyContent: 'center'}} key={doc.id}>
                            <Text>Room: {doc.Room}</Text>
                            <Text>Patient Name: {doc.Name}</Text>
                            <Text>Heart Rate: {doc.Heart}</Text>
                      
                        </View>
                    )
                })}
                
                <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate("Room1")}>
                    <Text style={styles.ButtonText}>Room1</Text>
                </TouchableOpacity>
            </View>
           
            

            <View style={{height:4, width: windowWidth, backgroundColor: "grey"}}></View>


            <View style={MainStyles.botContainer}>
            {patient2.map((doc) =>{
                    return(
                        <View style={{alignItems: 'center', justifyContent: 'center'}} key={doc.id}>
                            <Text>Room: {doc.Room}</Text>
                            <Text>Patient Name: {doc.Name}</Text>
                            <Text>Heart Rate: {doc.Heart}</Text>
                        </View>
                    )
                })}

                <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate("Room2")}>
                    <Text style={styles.ButtonText}>Room2</Text>
                </TouchableOpacity>
            </View>
              

            

        </View>
    )
}


const MainStyles = StyleSheet.create({
    topContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "red",
        borderBottomColor: "green",
        width: windowWidth,
  
        
    },
    botContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "blue",
        width: windowWidth,
           
    }
});