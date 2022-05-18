import { StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export const chartStyle = StyleSheet.create({
    container: {
        
        borderRadius: 15,
        alignItems: 'center', 
        justifyContent: 'center',
        width: screenWidth,
        
    }

})

export const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional

  };