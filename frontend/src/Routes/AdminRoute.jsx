import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AdminLogin from '../Pages/Admin/AdminLoginPage'
import Dashboard from '../Pages/Admin/AdminDashboard'
function AdminRoute() {
  return (
   <Routes>
         <Route path='login' element={<AdminLogin/>}/>
         <Route path='dashboard' element={<Dashboard/>}/>




   </Routes>
  )
}

export default AdminRoute
