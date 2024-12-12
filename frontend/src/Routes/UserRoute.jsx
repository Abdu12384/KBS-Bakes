import React from 'react'
import{Routes, Route} from 'react-router-dom'
import SignupPage from '../Pages/User/SignupPage'
import LoginPage from '../Pages/User/LoginPage'
import Home from '../Pages/User/HomePage'
import PageNotFound from '../Pages/PageNotFount/PageNotFount'
import ProductDetails from '../Components/ProductDetails'
import {ProtectedRoute,LoginProtectedRoute} from '../ProtectRoute/ProtectedRoute'
function UserRoute() {
  return (
    <Routes>
       <Route element={<LoginProtectedRoute/>}>
            <Route path='signup' element={<SignupPage/>}/>
            <Route path='login' element={<LoginPage/>}/>
       </Route>

    <Route element={<ProtectedRoute/>}>
        <Route path='home' element={<Home/>}/>
        <Route path='product-details/:id' element={<ProductDetails/>}/>
    </Route>
          
         <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default UserRoute
