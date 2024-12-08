import React from 'react'
import{Routes, Route} from 'react-router-dom'
import SignupPage from '../Pages/User/SignupPage'
import LoginPage from '../Pages/User/LoginPage'
import Home from '../Pages/User/HomePage'
function UserRoute() {
  return (
    <Routes>
        <Route path='signup' element={<SignupPage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='home' element={<Home/>}/>
    </Routes>
  )
}

export default UserRoute
