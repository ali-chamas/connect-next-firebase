'use client'
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [currentUser,setCurrentUser]=useState()
    const [loading,setLoading]=useState(true)
  

        onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
            setLoading(false)
        })
            
      
        
   

    
    return(
    <AuthContext.Provider value={{currentUser}}>
        {!loading && children}
    </AuthContext.Provider>

   )
};