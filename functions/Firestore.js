import {collection, getDocs, where, query, updateDoc, doc} from 'firebase/firestore'
import db from '../Firebase-config';
import {storeDataLocal} from '../functions/Storage'

    //Refrence to collection set XYZ
    const CollectionRef = collection(db, "XYZ")
   
    //Get Patients from firestore function
    export const GetPatient = async (SetPatients, RoomNumber) => {
        console.log("Getting patient")

        // Filter out each room using SQL query
        const q = query(CollectionRef, where("Room", "==", RoomNumber), where("Alive", "==", true))

        //Fetch Patients from firestore using the "getDocs" functions built inn from 'firebase/firestore'
        const data = await getDocs(q)
        
        SetPatients(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    
    
    //Get Patients from firestore and store that data in localstorage using function from 'function/Storage'
    export const GetPatientAndStoreLocal = async (SetPatients, RoomNumber) => {
        console.log("Getting patient")

        // Filter out each room using SQL query
        const q = query(CollectionRef, where("Room", "==", RoomNumber), where("Alive", "==", true))

        //Fetch Patients from firestore using the "getDocs" functions built inn from 'firebase/firestore'
        const data = await getDocs(q)
        
        SetPatients(data.docs.map((doc) => ({...doc.data(), id: doc.id})));

        const dataTemp = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
        storeDataLocal("Room" + RoomNumber, dataTemp);

    }
    

    export const updatePatient = async (id, newHeart, newBreath, newOxygen) =>{
        const docRef = doc(db, "XYZ", id);
        await updateDoc(docRef, {Heart: newHeart, Breath: newBreath, Oxygen: newOxygen});
    }
