import React from 'react'
import{Routes, Route} from 'react-router-dom'
import SignupPage from '../Pages/User/SignupPage'

function UserRoute() {
  return (
    <Routes>
        <Route path='signup' element={<SignupPage/>}/>
    </Routes>
  )
}

export default UserRoute
