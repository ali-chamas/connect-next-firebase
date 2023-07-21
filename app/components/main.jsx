'use client'
import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import Posts from './postsContainer'
import AddPost from './AddPost'
const Main = () => {
    const route=useRouter()
  const {currentUser}=useContext(AuthContext)
  

//   if(!currentUser){
//     route.push('/')
//   }
  return (
    <div>
      <AddPost/>
     <Posts/>
    </div>
  )
}

export default Main
