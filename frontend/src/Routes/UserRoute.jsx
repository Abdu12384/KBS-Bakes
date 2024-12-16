import React from 'react'
import{Routes, Route} from 'react-router-dom'
import SignupPage from '../Pages/User/SignupPage'
import LoginPage from '../Pages/User/LoginPage'
import Home from '../Pages/User/HomePage'
import PageNotFound from '../Pages/PageNotFount/PageNotFount'
import ProductDetails from '../Components/ProductDetails'
import {ProtectedRoute,LoginProtectedRoute} from '../ProtectRoute/ProtectedRoute'
import CakePage from '../Pages/User/CakePage'
import UserDashboard from '../Pages/User/UserDashboard'
import UserDetailsForm from '../Components/UserComponents/AccountDetails'
import AddressPage from '../Pages/User/AddressPage'
import CartPage from '../Pages/User/CartPage'
import CheckoutPage from '../Pages/User/CheckoutPage'
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
        <Route path='cakes' element={<CakePage/>}/> 
        <Route path='dashboard' element={<UserDashboard/>}/> 
        <Route path='account-details' element={<UserDetailsForm/>}/> 
        <Route path='Address' element={<AddressPage/>}/> 
        <Route path='cart' element={<CartPage/>}/> 
        <Route path='checkout' element={<CheckoutPage/>}/> 
    </Route>
          
         <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default UserRoute
