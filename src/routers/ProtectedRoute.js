import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from "../custom-hooks/useAuth"
import { Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const {currentUser}=useAuth()
  return currentUser ? <Outlet/> : <Navigate to='/login'/>
}

export default ProtectedRoute