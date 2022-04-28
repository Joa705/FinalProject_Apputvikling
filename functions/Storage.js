import AsyncStorage from "@react-native-async-storage/async-storage";


// Store userdata in localstorage
export const storeDataLocal = async (id, Data)  => {
    try{
        await AsyncStorage.setItem(toString(id), JSON.stringify(Data)); 
        console.log("Stored data locally")
    }
    catch (error){
        console.log(error);
    }
}

// Get userdata from localstorage
export const getDataLocal = async (id, setData) => {
    try{
        const temp = await AsyncStorage.getItem(toString(id));
        if(temp !== null){
            const data = JSON.parse(temp);

            if(setData){
               
             setData(data)
            }
        }
        
    }
    catch (error){
        console.log(error)
    }

    
}   


// Get a random number between min and max value
export const getRandomNumber = (min,max) =>{
    return Math.floor(Math.random()*(max-min+1)+min);
}