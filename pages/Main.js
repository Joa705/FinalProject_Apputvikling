import {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert} from 'react-native';
import {collection, getDocs} from 'firebase/firestore'
import db from '../Firebase-config';
import styles from '../GlobalStyles';
import {GetPatient} from '../functions/Firestore'

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


    useEffect(() =>{
        
        // function from Firestore file to fetch patients from room 1 and 2 and the save it to each usestate
       


        // Fetch some data every minute.
        const Interval = setInterval(() => {
            console.log("Inteval");
            GetPatient(SetPatient1, "1")
            GetPatient(SetPatient2, "2");
            console.log(patient2)
    

        }, 1000 * 5)

        return () => {
            clearInterval(Interval)
        }

    }, [])

    return(
        <View style={styles.container}>
            
            <View style={MainStyles.topContainer}>
                {patient1.map((doc) =>{
                    return(
                        <View key={doc.id}>
                            <Text>{doc.Room}</Text>
                            <Text>{doc.Name}</Text>
                            <Text>{doc.Heart}</Text>
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
                        <View key={doc.id}>
                            <Text>{doc.Room}</Text>
                            <Text>{doc.Name}</Text>
                            <Text>{doc.Heart}</Text>
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