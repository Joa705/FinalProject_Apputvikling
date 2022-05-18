import {onSnapshot, collection, getDocs, where, query, updateDoc, addDoc, orderBy, doc, setDoc, limit, getDoc, Timestamp, FieldValue} from 'firebase/firestore'
import db from '../Firebase-config';
import {storeDataLocal, getRandomNumber} from '../functions/Storage'

    //Refrence to collection set XYZ
    const collectionRef = collection(db, "XYZ")
    

    // Add previouse data to the Chart collection for each user
    export const addPatientChart = async (patientId, heart, breath, oxygen) => {
        const docRef = collection(db, "XYZ", patientId, "Chart")
        
        await addDoc(docRef, {"Heart": heart, "Breath": breath, "Oxygen": oxygen, "Date": Timestamp.now()})

    }


   export const getPatientChart = async (patientId) => {
        const docRef = collection(db, "XYZ", patientId, "Chart")
        try{
            const data = await getDocs(docRef)
            data.docs.forEach((doc)=>{
                console.log(doc.Number)
            })
        }
        catch{
            console.log("Failed to get patientChart data")
        }       
      
    }



    export const getLastPatientChart = async (patientId, setHeart, setBrath, setOxygen) => {
        const docRef = collection(db, "XYZ", patientId, "Chart")
        const q = query(docRef, orderBy("Date", "desc"), limit(15));
        
        const data = await getDocs(q)

        const heartTemp = []
        const breathTemp = []
        const oxygenTemp = []
      
        data.docs.map((doc) =>{
            heartTemp.push(doc.data().Heart) 
            breathTemp.push(doc.data().Breath) 
            oxygenTemp.push(doc.data().Oxygen)
           
        })

        setHeart(heartTemp.reverse());
        setBrath(breathTemp.reverse());
        setOxygen(oxygenTemp.reverse());
    }


    
    
    //Get Patients from firestore and store that data in localstorage using function from 'function/Storage'
    export const GetPatientsAndStoreLocal = async (SetPatientData) => {
        console.log("Getting patient data")

        const q = query(collectionRef, orderBy("Room", "asc"));
        const data = await getDocs(q);
        
        SetPatientData(data.docs.map((doc) => ({...doc.data(), id: doc.id})));

        const dataTemp = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
        storeDataLocal("PatientData", dataTemp);

    }


    //Update the state of each patient 
    export const updatePatient = async (id, newHeart, newBreath, newOxygen) =>{
        const docRef = doc(db, "XYZ", id);
        await updateDoc(docRef, {Heart: newHeart, Breath: newBreath, Oxygen: newOxygen});
        
    }


    export const updatePatientDetails = async (navigation, id, newName, newRoom) =>{
        const docRef = doc(db, "XYZ", id);
        const newFields = { Name: newName, Room: newRoom};
        await updateDoc(docRef, newFields);
        navigation.goBack();
  
    }

    export const addPatient = async (navigation, newName, newRoom, newLname, newAge) => {
        const patientRef = collection(db, "XYZ")
        await addDoc(patientRef, {"Name": newName, "LName": newLname, "Age": newAge, "Room": newRoom, "Heart": getRandomNumber(0, 200), "Breath": getRandomNumber(0, 100), "Oxygen": getRandomNumber(0, 100), Date: Timestamp.now()});
        navigation.goBack();
      };

    
    // Add new user details to firestore, id refrence from auth 
    export const createUserFirestore = (usrId, nickName) => {
        const docRef = doc(db, "Users", usrId);

        return setDoc(docRef, {"NickName": nickName, "Role": "employer", "Date": Timestamp.now()})
    }


    // Get the current user infromation from firestore
    export const getUserFirestore = (usrdId) => {
        const docRef = doc(db, "Users", usrdId);

        return getDoc(docRef)
    }