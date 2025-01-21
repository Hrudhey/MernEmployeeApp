import React from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import ProtectedRoutes from './components/ProtectedRoutes'
import Main from './components/Main'
import Employee from './components/Employee'
import AddEmployee from './components/AddEmployee'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route element={<ProtectedRoutes />}>
        <Route path='/employees' element={<Main child={<Employee />}/>}></Route>
        <Route path='/addemployee' element={<Main child={<AddEmployee />}/>}></Route>  {/*  used props*/}
        </Route>
      </Routes>
    </>
  )
}

export default App
