import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './Login'
import Test from './Test'
const AllRoutes = () => {
  return (
    <Routes>
     <Route path='/login' element={<Login/>}/>
     <Route path='/test' element={<Test/>}/>
    </Routes>
  )
}

export default AllRoutes