import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    const token=sessionStorage.getItem('logintoken');
    let verifyUser=false;
    if(token){                     // if token is present the user is true user
        verifyUser=true;
    }
  return (
    
    verifyUser?<Outlet/>:<Navigate to={'/'}/> 
  )
}

export default ProtectedRoutes