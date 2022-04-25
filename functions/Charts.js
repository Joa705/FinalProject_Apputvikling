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
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.6,
    color: (opacity = 1) => `rgba(241, 164, 42, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0)`,

  };