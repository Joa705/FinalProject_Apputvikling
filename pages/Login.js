import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image } from 'react-native';
import styles from '../GlobalStyles';
import { authentication, db } from '../Firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {createUserFirestore, getUserFirestore} from '../functions/Firestore'

export default function Login({navigation}){

    const [isSignedin, setIssignedin] = useState(false);
    const [createuser, setCreateuser] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('Passord1');
    const [email, setEmail] = useState('jojo@hotmail.com');

    const navigatoinhandler = (userName, userRole) => {
        if(authentication.currentUser){
            navigation.navigate('Main', {"userName": userName, "userRole": userRole});
        }
    }

    //Sign in to user account
    const signinUser = () => {
        signInWithEmailAndPassword(authentication, email, password)
        .then((re) => {
            getUserFirestore(re.user.uid)
            .then((res) => {
                const usrNameTemp = res.data().NickName;
                const roleTemp = res.data().Role;
                setIssignedin(true);
                navigatoinhandler(usrNameTemp, roleTemp);
            })
            .catch((err) => console.log(err))

        })
        .catch((re) => {
            console.log("failed to login")
        })
    };


    //sign out user
    const signoutUser = () => {
        signOut(authentication)
        .then((re) => {
            setIssignedin(false)
        })
        .catch((re) => {console.log("failed to sign out")})
    };




    // Register new user and set role for that user in firestore
    const registerUser = () => {
        createUserWithEmailAndPassword(authentication, email, password)
        .then((re) =>{
            createUserFirestore(re.user.uid, username)
            .then(() => {console.log("User created"); setIssignedin(true);})
            .catch(() => console.log("Failed to create user"))
             
            })
        .catch((re) => {console.log("Failed to register user")})
    };



    if(createuser){
        return(
            <View style={styles.container}>

            <View style={LoginStyle.top}>
            </View>

            <View style={LoginStyle.mid}>
             <TextInput style={LoginStyle.text} placeholder='Email' value={email} onChangeText={(text) => setEmail(text)}/>
            <View style={{height:10}}></View>
             <TextInput style={LoginStyle.text} placeholder='Password' value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
             <View style={{height:10}}></View>
             <TextInput style={LoginStyle.text} placeholder='Username' value={username} onChangeText={(text) => setUsername(text)}/>
             <View style={{height:10}}></View>
             <TouchableOpacity style={styles.ButtonContainer} onPress={registerUser}>
                 <Text style={styles.ButtonText}>Register</Text>
             </TouchableOpacity>
            </View>


            <View style={LoginStyle.bot}>
            <TouchableOpacity style={styles.ButtonContainer} onPress={() => setCreateuser(false)}>
                 <Text style={styles.ButtonText}>Login</Text>
             </TouchableOpacity>
            </View>
           
                

           
            </View>
        )
    }

    if(!createuser){
        return(
            <View style={styles.container}>
            
            <View style={LoginStyle.top}>
            </View>

            <View style={LoginStyle.mid}>
            <TextInput style={LoginStyle.text} placeholder='email' value={email} onChangeText={(text) => setEmail(text)}/>
            <View style={{height:10}}></View>
            <TextInput style={LoginStyle.text} placeholder='Password' value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
            <View style={{height:10}}></View>

            {isSignedin === true?
                <TouchableOpacity style={styles.ButtonContainer} onPress={signoutUser}>
                    <Text style={styles.ButtonText}>Sign out</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.ButtonContainer} onPress={signinUser}>
                    <Text style={styles.ButtonText}>Sign in</Text>
                </TouchableOpacity>
            }

            <View style={{height:20}}></View>

            </View>
            
           
            
            <View style={LoginStyle.bot}>      
             <TouchableOpacity style={styles.ButtonContainer} onPress={() => setCreateuser(true)}>
                 <Text style={styles.ButtonText}>Register new account</Text>
             </TouchableOpacity>
            </View>
    

            </View>
        )
    }
    
}



const LoginStyle = StyleSheet.create({
    top: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
     
    },
    mid: {
        flex:2,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bot: {
        flex:1,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    text: {
        fontSize: 15,
        color: 'black'
    },
  

})