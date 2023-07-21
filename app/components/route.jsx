'use client'
import Register from "../pages/Register"
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"
import { useRouter } from "next/navigation"
import React from 'react'

export default function Route() {
    const {currentUser}=useContext(AuthContext)
    const router = useRouter()
  return (
    <div>
   {currentUser?

    router.push('/home')
    :<Register/>
    
}
</div>
  )
}
