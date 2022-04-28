import { useEffect, useState } from 'react';
import {ImageBackground, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import styles from '../GlobalStyles';
import {getDataLocal} from '../functions/Storage'
import { BarChart, LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import {chartStyle, chartConfig} from '../functions/Charts'
import { heartReatIcon, breathIcon, oxygenIcon } from '../functions/Icons';
import {getPatientChart, getLastPatientChart} from '../functions/Firestore'

const screenWidth = Dimensions.get("window").width;

export default function Room({navigation, route}){

    const { selectedPatient } = route.params;
    const [patient, SetPatient] = useState([])
    const [currentChart, SetCurrentChart] = useState([2,3,4,5,6])
    const [currentChartName, SetCurrentChartName] = useState(["Heart Rate"])
    const [heartChart, SetHeartChart] = useState([])
    const [breathChart, SetBreathChart] = useState([])
    const [oxygenChart, SetOxygenChart] = useState([])


    const displayNewChart = (newChart, name) => {
        SetCurrentChart(newChart);
        SetCurrentChartName([name])
    }

    const chartData = () => {
        const data = {
            labels: ["1", "2", "3", "4", "5"],
            datasets: [
              {
                data: currentChart
              }
            ],
            legend: currentChartName // optional
          };
          
          return(
            <LineChart
            style={chartStyle.container}
            data={data}
            width={screenWidth - screenWidth * 0.05}
            height={250}
            chartConfig={chartConfig}
            verticalLabelRotation={0} 
            />
          )
    }
  


    useEffect(() => {
        getDataLocal(selectedPatient, SetPatient);
        getLastPatientChart(selectedPatient, SetHeartChart, SetBreathChart, SetOxygenChart)

    }, [])



    useEffect(() => {

        const interval = setInterval(()=>{
            // Fetch userdata from localstorage and save it to a usestate
            getDataLocal(selectedPatient, SetPatient);
            getLastPatientChart(selectedPatient, SetHeartChart, SetBreathChart, SetOxygenChart)
            chartData()
        }, 1000 * 3)

        return () =>{
            clearInterval(interval);
        }

    }, [])
    
 

    return(
        <View style={styles.container}>


                <View style={styles.container}>
                <ImageBackground source={require('../images/mainBackground.jpg')} resizeMode="cover" style={{width: screenWidth, height: 250, justifyContent: 'center', alignItems: 'center'}}>
                    {patient.map((doc) => {
                        if(doc.id == selectedPatient){
                            return(
                                <View style={Room1Style.patientName} key={doc.id}>
                                    <Text>{doc.Name}</Text>
                                </View>
                            )
                        }
                       
                    })}
                      

                </ImageBackground>


                </View>
            

            <View style={Room1Style.midToBottom}>

                <View style={styles.container}>
                    {patient.map((doc) =>{
                        if(doc.id == selectedPatient){
                            return(
                                <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}} key={doc.id}>
                                    
                                    <TouchableOpacity style={Room1Style.iconHeartView} onPress={() => {displayNewChart(heartChart, "Heart Rate")}}>
                                                {heartReatIcon()}
                                                <Text>{doc.Heart}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={Room1Style.iconBreathView} onPress={() => {displayNewChart(breathChart, "Breath Rate")}}>
                                                {breathIcon()}  
                                                <Text>{doc.Breath}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={Room1Style.iconOxygenView} onPress={() => {displayNewChart(oxygenChart, "Oxygen Saturation LvL")}}>
                                                {oxygenIcon()}
                                                <Text>{doc.Oxygen}</Text>
                                    </TouchableOpacity>
                            
                                </View>
                            )
                        }
                         
                        })}

   

                        {chartData()}

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