'use client'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import Link from 'next/link'
const Nav = () => {
    const route=useRouter()
  const {currentUser}=useContext(AuthContext)
  const [ loggedIn,setLoggedIn] = useState(true)
  
  useEffect(()=>{
    if(!currentUser){setLoggedIn(false)}
  },[])

 

  const logout =async ()=>{
    await signOut(auth)
    route.push('/')
  }
 
  return (
        
     <>
     {
     
     loggedIn?
    <div className=' h-20 bg-slate-100 shadow-md flex justify-between items-center px-16' >
        <Link href='/home'><h1 className='font-bold text-2xl text-purple-700'>Connect.</h1>
        </Link>
       <div className='flex  justify-around items-center gap-5'>
           
            <Link href='/home/profile'><img src= {currentUser && currentUser.photoURL} alt="" className=' rounded-full w-12 h-12 ' /></Link>

            <button className='bg-purple-700 text-white p-2 rounded-3xl hover:opacity-90' onClick={logout} >Logout</button>

            </div>
        

     
    </div>
    : route.push('/')
}
    

    </>   
)
  }


export default Nav
