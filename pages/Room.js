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
    const [currentChart, SetCurrentChart] = useState([1,1,1,1,1])
    const [currentUsingChart, SetCurrentUsingChart] = useState({
        labels: ["1", "2", "3", "4", "5"],
        datasets: [
          {
            data: currentChart
          }
        ],
        legend: currentChartName // optional
      })
    const [currentChartName, SetCurrentChartName] = useState([""])
    const [heartChart, SetHeartChart] = useState([])
    const [breathChart, SetBreathChart] = useState([])
    const [oxygenChart, SetOxygenChart] = useState([])
    const [chartType, SetChartType] = useState("")

    
    // When user clicks button, display the chosen chart on the screen
    const displayNewChart = (newChart, name) => {
        if(name == "Heart Rate"){SetChartType(["Heart", "Heart Rate"])}
        if(name == "Breath Rate"){SetChartType(["Breath", "Breath Rate"])}
        if(name == "Oxygen Saturation LvL"){SetChartType(["Oxygen", "Oxygen Saturation LvL"])}

        SetCurrentUsingChart({
            labels: ["1", "2", "3", "4", "5"],
            datasets: [
              {
                data: newChart
              }
            ],
            legend: [name] // optional
          });
    }


    // Update the current chart 
    const updateChartDisplay = () => {
        if(chartType[0] == "Heart"){
            SetCurrentUsingChart({
                labels: ["15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
                datasets: [
                  {
                    data: heartChart
                  }
                ],
                legend: [chartType[1]] // optional
              });
        }
        if(chartType[0] == "Breath"){
            SetCurrentUsingChart({
                labels: ["15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
                datasets: [
                  {
                    data: breathChart
                  }
                ],
                legend: [chartType[1]] // optional
              });
        }
        if(chartType[0] == "Oxygen"){
            SetCurrentUsingChart({
                labels: ["15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
                datasets: [
                  {
                    data: oxygenChart
                  }
                ],
                legend: [chartType[1]] // optional
              });
        }
        console.log("updating chart")
      
    } 

  

    useEffect(() => {
        getDataLocal(selectedPatient, SetPatient);
        getLastPatientChart(selectedPatient, SetHeartChart, SetBreathChart, SetOxygenChart);
        
        displayNewChart(heartChart, "Heart Rate")

    }, [])


    useEffect(() => {

        const interval = setInterval(()=>{
            // Fetch userdata from localstorage and save it to a usestate
            getDataLocal(selectedPatient, SetPatient);
            getLastPatientChart(selectedPatient, SetHeartChart, SetBreathChart, SetOxygenChart)
            updateChartDisplay()

          

        }, 1000 * 3)

        return () =>{
            clearInterval(interval);
        }

    }, [heartChart, breathChart, oxygenChart, chartType])
    
 

    return(
        <View style={styles.container}>


                <View style={styles.container}>
                    {patient.map((doc) => {
                        if(doc.id == selectedPatient){
                            return(
                                <View style={Room1Style.patientName} key={doc.id}>
                                    <Text style={{fontWeight: 'bold', fontSize:30}}>{doc.Name} {doc.LName}</Text>
                                    <Text>Age: {doc.Age}</Text>
                                </View>
                            )
                        }
                       
                    })}
                      



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


                    <LineChart
                    style={chartStyle.container}
                    data={currentUsingChart}
                    width={screenWidth - screenWidth * 0.05}
                    height={250}
                    chartConfig={chartConfig}
                    verticalLabelRotation={0} 
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
        backgroundColor: "#B2E7F7",
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