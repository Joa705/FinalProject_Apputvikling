import {collection, getDocs, where, query} from 'firebase/firestore'
import db from '../Firebase-config';


    //Refrence to collection set XYZ
    const CollectionRef = collection(db, "XYZ")
   
    //Get Patients from firestore function
    export const GetPatient = async (SetPatients, RoomNumber) => {
        
        // Filter out each room using SQL query
        const q = query(CollectionRef, where("Room", "==", RoomNumber), where("Alive", "==", true))

        //Fetch Patients from firestore using the "getDocs" functions built inn from 'firebase/firestore'
        const data = await getDocs(q)
        
        SetPatients(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

