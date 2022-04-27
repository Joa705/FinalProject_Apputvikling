import {collection, getDocs, where, query, updateDoc, doc, addDoc} from 'firebase/firestore'
import db from '../Firebase-config';
import {storeDataLocal} from '../functions/Storage'

    //Refrence to collection set XYZ
    const collectionRef = collection(db, "XYZ")
   
    //Get Patients from firestore function
    export const GetPatients = async () => {
        console.log("Getting patient")

        const data = await getDocs(collectionRef);
        
        SetPatients(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    export const UpdateLocalPatientData = (Data) => {

    }
    
    
    //Get Patients from firestore and store that data in localstorage using function from 'function/Storage'
    export const GetPatientsAndStoreLocal = async (SetPatientData) => {
        console.log("Getting patient data")

        const data = await getDocs(collectionRef);
        
        SetPatientData(data.docs.map((doc) => ({...doc.data(), id: doc.id})));

        const dataTemp = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
        storeDataLocal("PatientData", dataTemp);

    }
    

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

    export const addPatient = async (navigation, newName, newRoom) => {
        const patientRef = collection(db, "XYZ")
        await addDoc(patientRef, {Name: newName, Room: newRoom, Heart: "", Breath: "", Oxygen: ""});
        navigation.goBack();
      };
