'use client'

import React, { useState } from 'react'

import { createUserWithEmailAndPassword ,signInWithEmailAndPassword,updateProfile,setPersistence} from "firebase/auth";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc,addDoc, setDoc,collection, getDocs } from "firebase/firestore"; 
import { auth,db,storage} from "../firebase";

import Link from 'next/link';
import { useRouter } from 'next/navigation';



const Register = () => {
const [err,setErr] = useState(false)
const [success,setSuccess] = useState(false)
const [Register,setRegister]=useState(false)
const [login,setLogin]=useState(true)
const router = useRouter();


const switchToLogin=()=>{
  setRegister(false)
  setLogin(true)
  setErr(false)
}
const switchToRegister=()=>{
  setRegister(true)
  setLogin(false)
  setErr(false)
}
  

const HandleRegister=async(e)=>{

  e.preventDefault();
  const displayName = e.target[0].value;
  const email = e.target[1].value;
  const password = e.target[2].value;
  const file = e.target[3].files[0];

  const dbref = collection(db,'users')
  await getDocs(dbref)
  .then((snapshot)=>{
    let users=[]
    snapshot.docs.forEach((doc)=>{
      users.push({...doc.data()})
    })
    
    users.forEach((user)=>{
      
      if(displayName===user.displayName)
      {
        setErr(true)
        return;
      }
      else{
        setErr(false)
      }
    })
  })
  if(err){
    return;
  }
  else{
  try{
      const res =await createUserWithEmailAndPassword(auth, email, password)

      
  
     
      const storageRef = ref(storage, displayName);
      
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      
      uploadTask.on(
       
        
        (error) => {
          
        }, 
        () => {
         
          
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(res.user,{
              displayName,
              photoURL:downloadURL
            
            });
            await addDoc(dbref,{
              uid:res.user.uid,
              displayName,
              email,
              photoURL:downloadURL,
              bio:""
            }).then(()=>{router.push('/home')})
            .catch((err)=>{setErr(true)})
            
           

           
            
            
            
            
          });
         
        }
      );
  

      }catch(error){
          
            }
          }
  
 }

 const HandleLogin =async (e)=>{
  e.preventDefault()
  const email = e.target[0].value;
  const password = e.target[1].value;

await signInWithEmailAndPassword(auth,email,password)
.then(()=>{router.push('/home')})
.catch((err)=>{setErr(true)})

 }
  



  return (
    
    <div className='flex flex-col justify-center items-center bg-purple-200 h-screen'>
        <h1 className='text-purple-800 my-10 font-bold text-4xl '>Connect.2</h1>
        
          {login&& 
           <form  onSubmit={HandleLogin} className='flex justify-center items-center flex-col border p-10 shadow-lg bg-white '>
            <h1 className='text-purple-800 font-bold text-3xl my-3'>Sign In!</h1>
           <div className=' flex flex-col'>
           <label htmlFor="">email</label>
           <input type="text" 
           id='in'
           placeholder='username'
           
           />
           
           <label htmlFor="">Password</label>
           <input type="password" placeholder='password'
           id='in' />

          
               
           </div>
           {err&& <span className='text-red-800 text-sm font-bold'>invalid email or password</span>}
           <button className='p-2 rounded-2xl bg-purple-700 w-20 text-white hover:opacity-80 m-2'>Login</button>

          
           <p className=' text-gray-600 text-sm'>Doesn't have an account?<button onClick={
             switchToRegister

           } className='font-bold text-purple-900'>Sign up</button></p>
       </form>
          }

        {Register&& 
        <form  onSubmit={HandleRegister} className='flex justify-center items-center flex-col border p-10 shadow-lg bg-white '>
          <h1 className='text-purple-800 font-bold text-3xl my-3'>Sign Up!</h1>
            <div className=' flex flex-col'>
            <label htmlFor="">Username</label>
            <input type="text" 
            id='in'
            placeholder='username'
            
            />
            <label htmlFor="" >email</label>
            <input type="email" placeholder='email' id='in'/>
            <label htmlFor="">Password</label>
            <input type="password" placeholder='password'
            id='in' />

            <label htmlFor="image" className='cursor-pointer hover:opacity-80 text-purple-800'>click to Choose an image!</label>
                <input type="file" id="image" style={{display:'none'}} />
                
            </div>
            {err&& <span className='text-red-800 text-sm font-bold'>Username or email are not available</span>}
            <button className='p-2 rounded-2xl bg-purple-700 w-20 text-white hover:opacity-80 m-2'>Register</button>

           
            <p className=' text-gray-600 text-sm'>already have an account?<button onClick={
              switchToLogin

            } className='font-bold text-purple-900'>Login</button></p>
        </form>
}
      
    </div>
  )
}

export default Register
