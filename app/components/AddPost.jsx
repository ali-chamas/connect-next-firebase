'use client'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { db ,storage} from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc ,collection,FieldValue,serverTimestamp} from 'firebase/firestore'




function AddPost() {
const {currentUser} = useContext(AuthContext)
const [disable,setDisable]=useState(true)
const [caption,setCaption]=useState('')
const [image,setImage]=useState()

console.log(currentUser)
const addPost=async(e)=>{
        e.preventDefault();
        
        if(image==null) return alert('add image')

        const imageRef=ref(storage,`images/${image.name + currentUser.uid}`);


        const uploadTask = uploadBytesResumable(imageRef, image);
      
      
      uploadTask.on(
       
        
        (error) => {
          
        }, 
        () => {
         
          
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
           
            
            
           const dbRef=collection(db,'post')
           addDoc(dbRef,{
            photoUrl:downloadURL,
            author:currentUser.displayName,
            caption:caption,
            profilePhoto:currentUser.photoURL,
            likes:0,
            likedBy:'',
            created:serverTimestamp()
           }).then(()=>{
            setImage(null)
            setCaption('')
            setDisable(true)
        })

           
            
            
            
            
          });
         
        }
      );
      
        alert('post uploaded')
}


  return (
    <div className=' bg-slate-200 w-auto h-auto p-4 mx-5 my-2 lg:mx-20'>
      <form className='flex items-center justify-center gap-4' onSubmit={addPost}>
        <input type="text" placeholder="what's on your mind?" className='p-3 rounded-3xl'  onChange={(event)=>{
            if(event.target.value==='')setDisable(true)
            else setDisable(false)
            setCaption(event.target.value)}}/>
        <label htmlFor="image" className=' text-purple-700 cursor-pointer hover:opacity-80'>
            choose image
        </label>
        <input type="file" name="" id="image" style={{display:'none'}} onChange={(event)=>setImage(event.target.files[0])}/>

            <button disabled={disable} type='submit' className='py-2 px-4 bg-purple-800 text-white rounded-3xl hover:opacity-80 disabled:opacity-70'>post</button>
      </form>
    </div>
  )
}

export default AddPost
