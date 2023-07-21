'use client'
import React, { useEffect, useState,useContext } from 'react'
import {BiTrash,BiBookmarkAlt} from 'react-icons/bi'
import{AiOutlineHeart,AiFillHeart ,AiOutlineComment} from 'react-icons/ai'
import {collection,deleteDoc,doc,getDocs,orderBy,query,updateDoc} from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'


export default function Post() {
  const {currentUser} = useContext(AuthContext)
    const [posts,setPosts]=useState([])
    const [loading,setLoading]=useState(true);
    
    const [users,setUsers]=useState([])
    
useEffect(()=>{
    const dbref = collection(db,'post')
   getDocs(query(dbref,orderBy('created','desc')))
  .then((snapshot)=>{
    let data=[]
    snapshot.docs.forEach((doc)=>{
      data.push({...doc.data(),id:doc.id})
    })
    const userRef = collection(db,'users')
   getDocs(userRef)
  .then((snapshot)=>{
    let users=[]
    snapshot.docs.forEach((doc)=>{
      users.push({...doc.data(),id:doc.id})
    })

    setPosts(data)
    setUsers(users);
   
    setLoading(false)
    
})
})


},[posts])



       const checkDelete=(x)=>{
        if(x===currentUser.displayName) return true 
        else return false
       }
      

    const [like,setLike]=useState(false)
  return (
    
    <>
    {loading ? <h1>loading...</h1>:
    <>
    { posts.map((post)=> (
    
    <div className='m-5 bg-white shadow-md w-96 h-auto flex flex-col items-center lg:w-3/4'>

           

        <div className='flex justify-between items-center w-full p-5'>
      <div className='flex items-center gap-4 '>
        <img src={post.profilePhoto} alt="" className=' w-10 h-10 rounded-full'/>
        <p className='font-bold '>{post.author}</p>
      </div>
        <div className=''>
            {checkDelete(post.author) ? <button onClick={()=>deleteDoc(doc(db,'post',post.id))} className='text-2xl text-red-800 hover:opacity-70'><BiTrash/></button>: null}
            
            
          
        </div>

      </div>
      {post.photoUrl ?
      <>
      <div className='m-2'>
      <img src={post.photoUrl} className='w-80 h-80   '></img>
    </div>

          <div className='flex justify-between w-full'>
              <p className='text-xs text-gray-700 mx-5'>{post.likes} likes</p>
              <div></div>
          </div>
      <div className='flex justify-between w-full px-5'>
          <div className='flex gap-4'>
          {!like? <AiOutlineHeart 
          className={` cursor-pointer hover:opacity-70`} 
          onClick={()=>setLike(!like)}
          />:<AiFillHeart className=' cursor-pointer hover:opacity-70 text-red-700' onClick={()=>setLike(!like)}/>}
          <AiOutlineComment className='hover:opacity-70 cursor-pointer'/>
          </div>
          <div>
          <BiBookmarkAlt/>
          </div>
      </div>
    <div className='flex justify-between w-full'>
      <p className='mx-5'><b>caption:</b> {post.caption}</p>
      <div></div>

    </div> 
    </>:
    <>
       <p></p>
    </> }
      



    </div>
    ))}
    </>
}

    </>
  )
}
