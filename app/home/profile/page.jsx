'use client'
import { reload, updateProfile } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
import { doc ,getDocs,collection,updateDoc} from 'firebase/firestore'
import { db,storage } from '../../firebase'
import Nav from '../../components/Nav'
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const page = () => {
  const [existsBio,setExistsBio] = useState(false)
    const route=useRouter()
    const {currentUser}=useContext(AuthContext)
  const [bio,setBio]=useState('')
  let userID=0;
  let profile = null;
  useEffect(()=>{
    checkBio()
    changeImage()
    
  },[profile])
    

  
  const changeImage=async(e)=>{
    if (e && e.preventDefault) { e.preventDefault(); 
    console.log(e.target[0])
        const image = e.target[0].files[0];
        

        const storageRef = ref(storage, currentUser.displayName);
      
      const uploadTask = uploadBytesResumable(storageRef, image);
      
      
      uploadTask.on(
       
        
        (error) => {
          
        }, 
        () => {
         
          
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(currentUser,{
              
              photoURL:downloadURL
            
            });
            const docRef=doc(db,'users',userID)
            await updateDoc(docRef, {
                   
                    photoURL:image,
                },
                
                
             )
            
           

             
            
            
            
            
          });
          
        }
        
      )
      profile=image;
      }
       
  }
  
    const addBio=async (e)=>{
      if (e && e.preventDefault) { e.preventDefault(); 
        const bio = e.target[0].value
        
        
        const docRef=doc(db,'users',userID)
        await updateDoc(docRef, {
               
                bio:bio,
            },
           
         )
          }
         
        
    }
    const checkBio=async()=>{
      const dbref = collection(db,'users')
       await getDocs(dbref)
       .then((snapshot)=>{
         
         snapshot.docs.forEach((doc)=>{
           if(doc._document.data.value.mapValue.fields.displayName.stringValue === currentUser.displayName){
             console.log(doc.id)
           userID=doc.id
           
           if(!(doc._document.data.value.mapValue.fields.bio.stringValue === '') ){
             
             setBio(doc._document.data.value.mapValue.fields.bio.stringValue)
             setExistsBio(true)
           }
           }
         })
         
         
         
         
         })
        
       
   
 }
  return (
    <>
    {!currentUser? route.push('/'):
   
    <>
     <Nav/>
    <div className='flex shadow-lg justify-around items-center my-5'>

        <div className='flex flex-col items-center gap-5'>
          <img src={currentUser.photoURL} alt="" className=' w-20 h-20 rounded-full' />
          <p className=' font-bold'>{currentUser.displayName}</p>
          <form onSubmit={changeImage }>
         
          <label htmlFor="file" 
           className='cursor-pointer hover:opacity-80 text-purple-800' type='submit'  > choose image
          </label>
          <input type="file"  id="file" style={{display:'none'}} />
          <button className='p-2 rounded-2xl bg-purple-700 w-20 text-white hover:opacity-80 m-2 ' type='submit'>change </button>
          </form>
        </div>

          
          
          {console.log(existsBio)}
          {existsBio ? 
        
          <div className=' border-l-2 flex flex-col gap-4'>
            
            <p className='font-bold'>{bio}</p>
            
            
          </div>
      :
      <div className='border-l-2 flex flex-col gap-4'>
        <h1>Your profile is incomplete!</h1>
      <form onSubmit={addBio}>
      <input type="text" id='in'/>
      <button type='submit' className='p-2 rounded-2xl bg-purple-700 w-20 text-white hover:opacity-80 m-2'>add bio</button>

          
      </form>
      </div>
          }
         

    </div>
    </>
}
    </>
  )
}

export default page
