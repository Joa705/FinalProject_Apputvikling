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
export const getRandomNumber = (min,max, mod) =>{

        let u = 0, v = 0;
        while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        num = num / 10.0 + 0.5; // Translate to 0 -> 1
        if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
        num = Math.min(max, Math.round((num*100 * mod) + min));
        return num;
}