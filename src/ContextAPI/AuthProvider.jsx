import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../../firebase.init';




const AuthProvider = ({children}) => {

    const [user,setUser]=useState()
    const [loading,setLoading]=useState(true)

    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle=()=>{
        setLoading(true)
       return signInWithPopup(auth,googleProvider)
    }
    const createUser=(email,password)=>{
         setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginUser=(email,password)=>{
         setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const signOutUser=()=>{
         setLoading(true)
        return signOut(auth)
    }

    const UpdateUserProfile=(profile)=>{
         setLoading(true)
        return updateProfile(auth.currentUser,profile)
    }

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=> unsubscribe()
    },[])
    const authInfo={
        loading,
        user,
        setLoading,
        createUser,
        loginUser,
        signOutUser,
        signInWithGoogle,
        UpdateUserProfile
    }
    
    return (
    <AuthContext value={authInfo}>
        {children}
    </AuthContext>
    )
};

export default AuthProvider;