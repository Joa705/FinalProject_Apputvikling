import { useEffect, useState } from 'react';
import {ImageBackground, StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import styles from '../GlobalStyles';
import {getDataLocal} from '../functions/Storage'
import { BarChart, LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import {chartStyle, chartConfig} from '../functions/Charts'
import { heartReatIcon, breathIcon, oxygenIcon } from '../functions/Icons';


const screenWidth = Dimensions.get("window").width;

export default function Room1({}){

    const [patient, SetPatient] = useState([])

    useEffect(() => {
        getDataLocal("Room2", SetPatient);

    }, [])

    useEffect(() => {

        const interval = setInterval(()=>{
            // Fetch userdata from localstorage and save it to a usestate
            getDataLocal("Room2", SetPatient);
        }, 1000 * 2)

        return () =>{
            clearInterval(interval);
        }

    }, [])
    
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 150]
          }
        ],
        legend: ["Heart Rate"] // optional
      };


    return(
        <View style={styles.container}>

                
                <View style={styles.container}>
                <ImageBackground source={require('../images/mainBackground.jpg')} resizeMode="cover" style={{width: screenWidth, height: 250, justifyContent: 'center', alignItems: 'center'}}>

                    {patient.map((doc) => {
                        return(
                            <View style={Room1Style.patientName} key={doc.id}>
                                <Text>{doc.Name}</Text>
                            </View>
                        )
                    })}
                </ImageBackground>

                </View>
                

            <View style={Room1Style.midToBottom}>

                <View style={styles.container}>
                    {patient.map((doc) =>{
                            return(
                                <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}} key={doc.id}>
                                    <View style={Room1Style.iconHeartView}>
                                        {heartReatIcon()}
                                        <Text>{doc.Heart}</Text>
                                    </View>


                                    <View style={Room1Style.iconBreathView}>
                                        {breathIcon()}  
                                        <Text>{doc.Breath}</Text>
                                    </View>


                                    <View style={Room1Style.iconOxygenView}>
                                        {oxygenIcon()}
                                        <Text>{doc.Oxygen}</Text>
                                    </View>
                            
                                </View>
                            )
                        })}

                <LineChart
                style={chartStyle.container}
                data={data}
                width={screenWidth - screenWidth * 0.05}
                height={250}
                chartConfig={chartConfig}
                verticalLabelRotation={30} 
                />   



                </View>




            </View>






                

       
                       
        </View>
    )
}



const Room1Style = StyleSheet.create({
    topPage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth,

    },
    midToBottom: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#49C3C2",
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        elevation: 4,

        
        
    },
    patientName: {
        bottom: 20,
    },  

    iconHeartView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        height: 100,
        width: screenWidth - (screenWidth / 1.2),       
        borderRadius: 20,
        position: 'absolute',
        right: screenWidth - (screenWidth * 0.85),
        bottom: 50,
    },
    iconBreathView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        height: 100,
        width: screenWidth - (screenWidth / 1.2),       
        borderRadius: 20,
        position: 'absolute',
        bottom: 50,
    },
    iconOxygenView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        height: 100,
        width: screenWidth - (screenWidth / 1.2),       
        borderRadius: 20,
        position: 'absolute',
        bottom: 50,
        left: screenWidth - (screenWidth * 0.85),
        

    }
})